import cfr from 'cosmos-fundraiser'
const { bitcoin } = cfr
const { sendEmail } = cfr

const empty = {
  progress: 1,
  wallet: null,
  tx: null,
  password: ''
}

const state = JSON.parse(JSON.stringify(empty))

const mutations = {
  resetBtcDonation (state) {
    state = JSON.parse(JSON.stringify(empty))
  },
  setBtcDonationWallet (state, wallet) {
    state.wallet = wallet
    console.log('SET btcDonation.wallet')
  },
  setBtcDonationEncryptedSeed (state, encryptedSeed) {
    state.encryptedSeed = encryptedSeed
    console.log('SET btcDonation.encryptedSeed')
  },
  setBtcDonationProgress (state, value) {
    state.progress = value
    console.log('SET btcDonation.progress', state.progress)
  },
  setBtcDonationTx (state, tx) {
    state.tx = tx
    console.log('SET btcDonation.tx', state.tx)
  },
  setBtcDonationPassword (state, password) {
    state.password = password
    console.log('SET btcDonation.password', state.password)
  }
}

const actions = {
  generateBtcDonationWallet ({ commit }, password) {
    let seed = cfr.generateSeed()
    let wallet = cfr.deriveWallet(seed)
    commit('setBtcDonationWallet', wallet)
    commit('setBtcDonationPassword', password)
    cfr.encryptSeed(seed, password, (err, encryptedSeed) => {
      if (err) {
        commit('notifyError', {
          title: 'Wallet Encryption Error',
          body: 'Could not encrypt wallet'
        })
        return
      }
      commit('setBtcDonationEncryptedSeed', encryptedSeed)
      commit('setBtcDonationProgress', 2)
    })
  },
  finalizeBtcDonation ({ commit, dispatch, state, rootState }, cb) {
    let { wallet, tx } = state
    let finalTx = bitcoin.createFinalTx(wallet, tx)
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
      commit('resetBtcDonation')
      commit('notifyCustom', {
        title: 'Donation Successful',
        body: `You have succesfully donated ${finalTx.paidAmount / 1e8} BTC and will receive ${finalTx.atomAmount} ATOM.`
      })
      cb()
    })
  },
  emailBtcDonationWallet ({ commit, getters }, { emailAddress, cb }) {
    let { encryptedSeed } = getters.btcDonation
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
  }
}

export default {
  state,
  mutations,
  actions
}
