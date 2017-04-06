import { bitcoin, ethereum } from 'cosmos-fundraiser'

const state = {
  started: false,
  ended: false,
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
  },
  setStarted (state, started) {
    state.started = started
  },
  setEnded (state, ended) {
    state.ended = ended
    if (ended) state.overlayMessage = 'The fundraiser has ended.'
  }
}

const actions = {
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
      commit('setBtcRaised', stats.amountDonated)
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
  },
  checkStatus ({ commit, rootState }) {
    ethereum.fetchIsActive('', (err, res) => {
      if (err) {
        console.error(err.stack)
        commit('notifyError', {
          title: 'Error Fetching Fundraiser Status',
          body: 'The fundraiser may have ended, check with the Cosmos Foundation for more information before donating.'
        })
        return
      }
      let isActive = res === 1
      let startTime = new Date(rootState.config.START_DATETIME).getTime()
      let endTime = startTime + rootState.config.ENDS_AFTER * 24 * 60 * 60 * 1000
      // can start up to 1 hour late
      let pastStart = Date.now() > (startTime + 60 * 60 * 1000)
      let pastEnd = Date.now() > (startTime + endTime)
      commit('setStarted', isActive || pastStart)
      commit('setEnded', (!isActive && pastStart) || pastEnd)
    })
  },
  startStatusInterval ({ dispatch }) {
    setInterval(() => dispatch('checkStatus'), 10e3) // poll every 10s
    dispatch('checkStatus')
  }
}

export default {
  state,
  mutations,
  actions
}
