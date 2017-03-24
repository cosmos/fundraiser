import cfr from 'cosmos-fundraiser'
const { bitcoin, ethereum } = cfr

const empty = {
  progress: 1,
  wallet: null,
  mnemonic: '',
  tx: null,
  currency: '',
  feeRate: 220,
  ethRate: 0,
  agreed: false
}

const state = JSON.parse(JSON.stringify(empty))

const mutations = {
  resetDonation (state) {
    state = JSON.parse(JSON.stringify(empty))
  },
  setDonationAgreed (state, value) {
    state.agreed = value
  },
  setDonationWallet (state, wallet) {
    state.wallet = wallet
    console.log('SET donation.wallet')
  },
  setDonationMnemonic (state, mnemonic) {
    state.mnemonic = mnemonic
    console.log('SET donation.mnemonic', state.mnemonic)
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
  },
  setEthDonationAtomRate (state, ethRate) {
    state.ethRate = ethRate
    console.log('SET donation.ethRate', state.ethRate)
  }
}

const actions = {
  generateDonationWallet ({ commit }) {
    let mnemonic = cfr.generateMnemonic()
    let wallet = cfr.deriveWallet(mnemonic)
    commit('setDonationWallet', wallet)
    commit('setDonationMnemonic', mnemonic)
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
  },
  fetchEthDonationAtomRate ({ commit }) {
    ethereum.fetchAtomRate(ethereum.FUNDRAISER_CONTRACT, (err, atomRate) => {
      if (err) {
        console.error(err)
        commit('notifyError', {
          title: 'Ethereum Error',
          body: 'Could not fetch ATOM/ETH exchange rate from Etherscan.'
        })
        return
      }
      commit('setEthDonationAtomRate', atomRate)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
