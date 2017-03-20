import cfr from 'cosmos-fundraiser'
const { bitcoin, sendEmail } = cfr

const empty = {
  progress: 1,
  wallet: null,
  tx: null,
  password: '',
  encryptedSeed: null,
  currency: '',
  feeRate: 220
}

const state = JSON.parse(JSON.stringify(empty))

const mutations = {
  resetDonation (state) {
    state = JSON.parse(JSON.stringify(empty))
  },
  setDonationWallet (state, wallet) {
    state.wallet = wallet
    console.log('SET donation.wallet')
  },
  setDonationEncryptedSeed (state, encryptedSeed) {
    state.encryptedSeed = encryptedSeed
    console.log('SET donation.encryptedSeed')
  },
  setDonationPassword (state, password) {
    state.password = password
    console.log('SET donation.password', state.password)
  },
  setDonationProgress (state, value) {
    state.progress = value
    console.log('SET donation.progress', state.progress)
  },
  setDonationCurrency (state, currency) {
    state.currency = currency
    console.log('SET donation.currency', state.currency)
  },
  setBtcDonationTx (state, tx) {
    state.tx = tx
    console.log('SET donation.tx', state.tx)
  },
  setBtcDonationFeeRate (state, feeRate) {
    state.feeRate = feeRate
    console.log('SET donation.feeRate', state.feeRate)
  }
}

const actions = {
  generateDonationWallet ({ commit }, password) {
    let seed = cfr.generateSeed()
    let wallet = cfr.deriveWallet(seed)
    commit('setDonationWallet', wallet)
    commit('setDonationPassword', password)
    cfr.encryptSeed(seed, password, (err, encryptedSeed) => {
      if (err) {
        commit('notifyError', {
          title: 'Wallet Encryption Error',
          body: 'Could not encrypt wallet'
        })
        return
      }
      commit('setDonationEncryptedSeed', encryptedSeed)
      commit('setDonationProgress', 2)
    })
  },
  finalizeBtcDonation ({ commit, dispatch, state, rootState }, cb) {
    let { wallet, tx, feeRate } = state
    let finalTx = bitcoin.createFinalTx(wallet, tx, feeRate)
    bitcoin.pushTx(finalTx.tx, (err) => {
      if (err) {
        console.error(err)
        commit('notifyError', {
          title: 'Bitcoin Error',
          body: 'Could not broadcast donation transaction.'
        })
        return cb(err)
      }
      let txid = finalTx.tx.getId()
      console.log('sent final tx. txid=' + txid)
      commit('addDonation', {
        type: 'btc',
        time: Date.now(),
        price: rootState.config.COINS.BTC.EXCHANGE_RATE,
        atoms: finalTx.atomAmount
      })
      commit('resetDonation')
      commit('notifyCustom', {
        title: 'Donation Successful',
        body: `You have succesfully donated ${finalTx.paidAmount / 1e8} BTC and will receive ${finalTx.atomAmount} ATOM.`
      })
      cb()
    })
  },
  emailDonationWallet ({ commit, getters }, { emailAddress, cb }) {
    let { encryptedSeed } = getters.donation
    let walletBytes = cfr.encodeWallet(encryptedSeed)
    sendEmail(emailAddress, walletBytes, (err) => {
      if (err) {
        console.error(err)
        commit('notifyError', {
          title: 'Wallet Backup Error',
          body: 'An error occurred while backing up your wallet.'
        })
        return cb(err)
      }
      commit('notifyCustom', {
        title: 'Wallet Email Sent',
        body: 'We sent you an email with a copy of your Cosmos wallet so you don\'t lose it.'
      })
      cb(null)
    })
  },
  fetchBtcDonationFeeRate ({ commit }) {
    bitcoin.fetchFeeRate((err, feeRate) => {
      if (err) {
        console.error(err)
        commit('notifyError', {
          title: 'Bitcoin Error',
          body: 'Could not fetch recommended transaction fee rate from 21.co.'
        })
        return
      }
      console.log('got fee rate:', feeRate)
      commit('setBtcDonationFeeRate', feeRate)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
