import bcrypt from 'bcryptjs'

const empty = {
  type: 'btc',
  time: 0,
  price: 0,
  atoms: 1000,
  email: '',
  hash: '',
  progress: 1
}

const state = JSON.parse(JSON.stringify(empty))

const mutations = {
  resetFundBtc (state) {
    state = JSON.parse(JSON.stringify(empty))
  },
  setFundBtcTime (state, time) {
    state.time = time
    console.log('SET fundBtc.time', state.time)
  },
  setFundBtcPrice (state, price) {
    state.price = price
    console.log('SET fundBtc.price', state.price)
  },
  setFundBtcAtoms (state, value) {
    state.atoms = value
    console.log('SET fundBtc.atoms', state.atoms)
  },
  setFundBtcEmail (state, value) {
    state.email = value
    console.log('SET fundBtc.email', state.email)
  },
  setFundBtcHash (state, plaintextPassword) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(plaintextPassword, salt)
    state.hash = hash
    console.log('SET fundBtc.hash', state.hash)
  },
  setFundBtcProgress (state, value) {
    state.progress = value
    console.log('SET fundBtc.progress', state.progress)
  }
}

export default {
  state,
  mutations
}
