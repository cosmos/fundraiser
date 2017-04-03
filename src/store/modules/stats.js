import { bitcoin, ethereum, fetchStatus } from 'cosmos-fundraiser'

const MAX_DONATIONS = 30

const state = {
  status: { fundraiserEnded: false },
  overlayMessage: 'The fundraiser has not started yet.',
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
  setFundraiserStatus (state, status) {
    state.status = status
  },
  setFundraiserStatusMessage (state, message) {
    state.overlayMessage = message
  },
  addDonation (state, donation) {
    if (state.donationsMap[donation.id] != null) return
    state.donationsMap[donation.id] = true
    state.donations.push(donation)
    state.donations.sort((a, b) => b.time - a.time)

    if (state.donations.length > MAX_DONATIONS) {
      let toRemove = state.donations.pop()
      delete state.donationsMap[toRemove.id]
    }

    state.donations = state.donations.slice(0) // clone to trigger update
  },
  setBtcRaised (state, btcRaised) {
    state.progress.btcRaised = btcRaised
  },
  setBtcTxCount (state, btcTxCount) {
    state.progress.btcTxCount = btcTxCount
  },
  setAtomsClaimedBtc (state, atomsClaimedBtc) {
    state.progress.atomsClaimedBtc = atomsClaimedBtc
  },
  setEthRaised (state, ethRaised) {
    state.progress.ethRaised = ethRaised
  },
  setEthTxCount (state, ethTxCount) {
    state.progress.ethTxCount = ethTxCount
  },
  setAtomsClaimedEth (state, atomsClaimedEth) {
    state.progress.atomsClaimedEth = atomsClaimedEth
  }
}

const actions = {
  fetchFundraiserStatus ({ commit }) {
    // 'status', not to be confused with 'stats'
    // this tells us if the fundraiser has ended
    fetchStatus((err, status) => {
      if (err) {
        console.error(err.stack)
        commit('notifyError', {
          title: 'Error Fetching Fundraiser Status',
          body: 'The fundraiser may have ended, check with the Cosmos Foundation for more information before donating.'
        })
        return
      }
      commit('setFundraiserStatus', status)
      if (status.fundraiserEnded) {
        commit('setFundraiserStatusMessage', 'The fundraiser has ended.')
      }
    })
  },
  fetchStats ({ commit }) {
    bitcoin.fetchFundraiserStats((err, stats) => {
      if (err) {
        console.error(err.stack)
        commit('notifyError', {
          title: 'Error Fetching Donation Stats',
          body: 'Could not fetch BTC donation stats.'
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

    ethereum.fetchTotals(ethereum.FUNDRAISER_CONTRACT, (err, totals) => {
      if (err) {
        console.error(err.stack)
        commit('notifyError', {
          title: 'Error Fetching Donation Stats',
          body: 'Could not fetch ETH donation stats.'
        })
        return
      }
      console.log(totals)
      commit('setEthRaised', totals.ether)
      commit('setAtomsClaimedEth', totals.atoms)
    })

    ethereum.fetchTxs(ethereum.FUNDRAISER_CONTRACT, (err, txs) => {
      if (err) {
        console.error(err.stack)
        commit('notifyError', {
          title: 'Error Fetching Donation Stats',
          body: 'Could not fetch ETH donations from Etherscan.'
        })
        return
      }
      for (let tx of txs) {
        console.log(tx)
        commit('addDonation', {
          id: tx.hash,
          type: 'eth',
          time: parseInt(tx.timeStamp) * 1000,
          donated: parseInt(tx.value) / 1e18,
          claimed: 0
        })
      }
    })
  },
  startFetchInterval ({ dispatch }) {
    setInterval(() => dispatch('fetchStats'), 60e3) // update once per minute
    dispatch('fetchStats')
  }
}

export default {
  state,
  mutations,
  actions
}
