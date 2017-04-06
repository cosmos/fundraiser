const state = {
  time: 0
}

const mutations = {
  setDebugFundraiserTime (state, time) {
    state.time = time
    if (time === 0) console.log('resetting fundraiser')
    if (time === 1) console.log('starting fundraiser')
    if (time === 2) console.log('showing fundraiser cap')
    if (time === 3) console.log('ending fundraiser')
  }
}

export default {
  state,
  mutations
}
