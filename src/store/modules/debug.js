const state = {
  enabled: process.env.NODE_ENV === 'development'
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
