const state = {
  status: 0
}

const mutations = {
  setDebugFundraiserStatus (state, status) {
    state.status = status
    if (status === 0) console.log('resetting fundraiser')
    if (status === 1) console.log('starting fundraiser')
    if (status === 2) console.log('showing fundraiser cap')
    if (status === 3) console.log('ending fundraiser')
  }
}

export default {
  state,
  mutations
}
