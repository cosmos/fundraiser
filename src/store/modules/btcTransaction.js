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
  resetBtcTransaction (state) {
    state = JSON.parse(JSON.stringify(empty))
  },
  setBtcTransactionUserId (state, userId) {
    state.userId = userId
    console.log('SET btcTransaction.userId', state.userId)
  },
  setBtcTransactionTime (state, time) {
    state.time = time
    console.log('SET btcTransaction.time', state.time)
  },
  setBtcTransactionPrice (state, price) {
    state.price = price
    console.log('SET btcTransaction.price', state.price)
  },
  setBtcTransactionAtoms (state, value) {
    state.atoms = value
    console.log('SET btcTransaction.atoms', state.atoms)
  },
  setBtcTransactionHash (state, plaintextPassword) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(plaintextPassword, salt)
    state.hash = hash
    console.log('SET btcTransaction.hash', state.hash)
  },
  setBtcTransactionProgress (state, value) {
    state.progress = value
    console.log('SET btcTransaction.progress', state.progress)
  }
}

export default {
  state,
  mutations
}
