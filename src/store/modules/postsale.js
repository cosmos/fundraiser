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
    // remove '0x' prefix if present
    if (address.toLowerCase().startsWith('0x')) {
      address = address.slice(2)
    }
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
