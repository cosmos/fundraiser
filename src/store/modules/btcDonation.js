import cfr from 'cosmos-fundraiser'

const empty = {
  type: 'btc',
  time: 0,
  price: 0,
  atoms: 0,
  hash: '',
  progress: 1
}

const state = JSON.parse(JSON.stringify(empty))

const mutations = {
  resetBtcDonation (state) {
    state = JSON.parse(JSON.stringify(empty))
  },
  setBtcDonationTime (state, time) {
    state.time = time
    console.log('SET btcDonation.time', state.time)
  },
  setBtcDonationPrice (state, price) {
    state.price = price
    console.log('SET btcDonation.price', state.price)
  },
  setBtcDonationAtoms (state, value) {
    state.atoms = value
    console.log('SET btcDonation.atoms', state.atoms)
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
  }
}

const actions = {
  generateBtcDonationWallet ({ commit }, password) {
    let seed = cfr.generateSeed()
    let wallet = cfr.deriveWallet(seed)
    commit('setBtcDonationWallet', wallet)
    let encryptedSeed = cfr.encryptSeed(seed, password)
    commit('setBtcDonationEncryptedSeed', encryptedSeed)
    commit('setBtcDonationProgress', 2)
  }
}

export default {
  state,
  mutations,
  actions
}
