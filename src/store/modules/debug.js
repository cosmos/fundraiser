const state = {
  status: -1
}

const mutations = {
  setDebugFundraiserStatus (state, status) {
    state.status = status
    if (status === -1) console.log('resetting fundraiser')
    if (status === 0) console.log('starting fundraiser')
    if (status === 1) console.log('ending fundraiser')
  }
}

export default {
  state,
  mutations
}
