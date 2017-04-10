import { allocation } from 'cosmos-fundraiser'
const { status } = allocation

const empty = {
  progress: 1,
  wallet: null,
  mnemonic: '',
  tx: null,
  currency: '',
  feeRate: 220,
  ethRate: status.atom_per_eth,
  agreed: false
}

const state = JSON.parse(JSON.stringify(empty))

const mutations = {
  resetDonation (state) {
    state.progress = 3
    state.tx = null
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
  setDonationMnemonicAndWallet ({ commit }, mnemonic) {},
  generateDonationWallet ({ dispatch }) {},
  fetchEthDonationAtomRate ({ commit }) {}
}

export default {
  state,
  mutations,
  actions
}
