const state = {
  enabled: true
}

const mutations = {
  setDebugEnabled (state, enabled) {
    state.enabled = enabled
  }
}

export default {
  state,
  mutations
}
