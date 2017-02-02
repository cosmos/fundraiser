import bcrypt from 'bcryptjs'

const empty = {
  atoms: 1000,
  email: '',
  hash: '',
  progress: 1
}

const state = JSON.parse(JSON.stringify(empty))

const mutations = {
  resetFund (state) {
    state = JSON.parse(JSON.stringify(empty))
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
