import { bitcoin } from 'cosmos-fundraiser'

const MAX_DONATIONS = 30

const state = {
  donationsMap: {},
  donations: [],
  progress: {
    btcRaised: 0,
    btcTxCount: 0,
    ethRaised: 0,
    ethTxCount: 0,
    atomsClaimedBtc: 0,
    atomsClaimedEth: 0
  }
}

const mutations = {
  addDonation (state, donation) {
    if (state.donationsMap[donation.id] != null) return
    state.donationsMap[donation.id] = true
    state.donations.push(donation)
    state.donations.sort((a, b) => b.time - a.time)
    state.donations = state.donations.slice(0) // clone to trigger update

    if (state.donations.length > MAX_DONATIONS) {
      let toRemove = state.donations.pop()
      delete state.donationsMap[toRemove.id]
    }
  },
  setBtcRaised (state, btcRaised) {
    state.progress.btcRaised = btcRaised
  },
  setBtcTxCount (state, btcTxCount) {
    state.progress.btcTxCount = btcTxCount
  },
  setAtomsClaimedBtc (state, atomsClaimedBtc) {
    state.progress.atomsClaimedBtc = atomsClaimedBtc
  }
}

const actions = {
  fetchStats ({ commit }) {
    bitcoin.fetchFundraiserStats((err, stats) => {
      if (err) {
        console.error(err.stack)
        commit('notifyError', {
          title: 'Error Fetching Donation Stats',
          body: 'Could not fetch BTC donations from Blockchain.info.'
        })
        return
      }
      commit('setBtcRaised', stats.amountDonated / 1e8)
      commit('setAtomsClaimedBtc', stats.amountClaimed)
      commit('setBtcTxCount', stats.txCount)
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
