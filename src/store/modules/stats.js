import { bitcoin, ethereum, fetchStatus } from 'cosmos-fundraiser'

const state = {
  status: { fundraiserEnded: false },
  overlayMessage: 'The fundraiser has not started yet.',
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
      console.log('ATOMS CLAIMED BTC', stats.amountClaimed)
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
      console.log('ATOMS CLAIMED ETH', totals.atoms)
      console.log(totals)
      commit('setEthRaised', totals.ether)
      commit('setAtomsClaimedEth', totals.atoms)
    })
    ethereum.fetchNumDonations(ethereum.FUNDRAISER_CONTRACT, (err, txCount) => {
      if (err) {
        console.error(err.stack)
        commit('notifyError', {
          title: 'Error Fetching Total Number of Donations',
          body: 'Could not fetch ETH total num donations.'
        })
        return
      }
      console.log('ETH TXCOUNT', txCount)
      commit('setEthTxCount', txCount)
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
