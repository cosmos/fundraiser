import bcrypt from 'bcryptjs'

const empty = {
  type: 'btc',
  time: 0,
  price: 0,
  coins: 1000,
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
    state.coins = value
    console.log('SET fundBtc.coins', state.coins)
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
