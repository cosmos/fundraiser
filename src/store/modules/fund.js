const emptyFund = {
  atoms: 0,
  btcAddress: '1NAfx5GEZHR8t69LjxTeShPP4XXaxeUqQw',
  bitcoinCost: 0.001,
  progress: 1,
  user: {
    name: '',
    email: '',
    nationality: '',
    publicKey: ''
  }
}

const state = emptyFund

const mutations = {
  resetFund (state) {
    state = JSON.parse(JSON.stringify(emptyFund))
  },
  setFundAtoms (state, value) { state.user.atoms = value },
  setFundBtcAddress (state, value) { state.btcAddress = value },
  setFundBtcCost (state, value) { state.btcCost = value },
  setFundProgress (state, value) { state.progress = value },
  setFundUserName (state, value) { state.user.name = value },
  setFundUserEmail (state, value) { state.user.email = value },
  setFundUserNationality (state, value) { state.user.nationality = value },
  setFundUserPubkey (state, value) { state.user.pubkey = value }
}

export default {
  state,
  mutations
}
