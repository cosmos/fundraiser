import { bitcoin, ethereum } from 'cosmos-fundraiser'

const state = {
  started: false,
  ended: false,
  pastStart: false,
  pastEnd: false,
  isActive: false,
  overlayMessage: '',
  progress: {
    btcRaised: 0,
    btcTxCount: 0,
    ethRaised: 0,
    ethTxCount: 0,
    atomsClaimedBtc: 0,
    atomsClaimedEth: 0
  }
}

function setStatus () {
  state.started = state.isActive || state.pastStart
  state.ended = (!state.isActive && state.pastStart) || state.pastEnd
  if (state.ended) {
    state.overlayMessage = 'The fundraiser has ended.'
  } else {
    state.overlayMessage = 'The fundraiser has not started yet.'
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
  setPastStart (state, pastStart) {
    state.pastStart = pastStart
    setStatus()
  },
  setPastEnd (state, pastEnd) {
    state.pastEnd = pastEnd
    setStatus()
  },
  setIsActive (state, isActive) {
    state.isActive = isActive
    setStatus()
  }
}

const actions = {
  fetchStats ({ commit }) {
    if (!state.started) return
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
    if (rootState.debug.enabled) {
      return
    }
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
      commit('setIsActive', isActive)
    })
  },
  checkTime ({ commit, rootState }) {
    let startTime = new Date(rootState.config.START_DATETIME).getTime()
    let endTime = startTime + rootState.config.ENDS_AFTER * 24 * 60 * 60 * 1000
    // can start up to 1 hour late
    let pastStart = Date.now() > (startTime + 60 * 60 * 1000)
    let pastEnd = Date.now() > (startTime + endTime)
    commit('setPastStart', pastStart)
    commit('setPastEnd', pastEnd)
  },
  startStatusInterval ({ dispatch }) {
    setInterval(() => dispatch('checkStatus'), 10e3) // poll eth/isActive every 10s
    dispatch('checkStatus')
    setInterval(() => dispatch('checkTime'), 1e3) // poll clock every 10s
    dispatch('checkTime')
  }
}

export default {
  state,
  mutations,
  actions
}
