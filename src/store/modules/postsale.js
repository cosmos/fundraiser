const state = {
  mnemonic: '',
  cosmosAddress: '',
  atomAllocation: null
}

const mutations = {
  setMnemonic (state, mnemonic) {
    state.mnemonic = mnemonic
  },
  setCosmosAddress (state, address) {
    state.cosmosAddress = address
  },
  setAtomAllocation (state, atoms) {
    state.atomAllocation = atoms
  }
}

export default {
  state,
  mutations
}
