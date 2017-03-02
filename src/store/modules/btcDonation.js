import bcrypt from 'bcryptjs'

const empty = {
  type: 'btc',
  time: 0,
  price: 0,
  atoms: 0,
  hash: '',
  progress: 1,
  userId: ''
}

const state = JSON.parse(JSON.stringify(empty))

const mutations = {
  resetBtcDonation (state) {
    state = JSON.parse(JSON.stringify(empty))
  },
  setBtcDonationUserId (state, userId) {
    state.userId = userId
    console.log('SET btcDonation.userId', state.userId)
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
  setBtcDonationHash (state, plaintextPassword) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(plaintextPassword, salt)
    state.hash = hash
    console.log('SET btcDonation.hash', state.hash)
  },
  setBtcDonationProgress (state, value) {
    state.progress = value
    console.log('SET btcDonation.progress', state.progress)
  }
}

export default {
  state,
  mutations
}
