import { bitcoin } from 'cosmos-fundraiser'

const MAX_DONATIONS = 30

const state = {
  donationsMap: {},
  donations: []
}

const mutations = {
  addDonation (state, donation) {
    console.log('submitting donation', donation)

    if (state.donationsMap[donation.id] != null) return
    state.donationsMap[donation.id] = true
    state.donations.push(donation)
    state.donations.sort((a, b) => b.time - a.time)
    state.donations = state.donations.slice(0) // clone to trigger update

    if (state.donations.length > MAX_DONATIONS) {
      let toRemove = state.donations.pop()
      delete state.donationsMap[toRemove.id]
    }
  }
}

const actions = {
  fetchStats ({ commit }) {
    bitcoin.fetchFundraiserStats((err, stats) => {
      if (err) {
        console.error(err.stack)
        commit('notifyError', {
          title: 'Error Fetching Donation Stats',
          body: 'Could not fetch information about BTC donations.'
        })
        return
      }
      for (let tx of stats.recentTxs) {
        commit('addDonation', {
          id: tx.hash,
          type: 'btc',
          time: tx.time * 1000,
          donated: tx.donated / 1e8,
          claimed: tx.claimed
        })
      }
    })
  },
  startFetchInterval ({ dispatch }) {
    // TODO: replace with realtime websocket API
    setInterval(() => dispatch('fetchStats'), 60e3)
    dispatch('fetchStats')
  }
}

export default {
  state,
  mutations,
  actions
}
