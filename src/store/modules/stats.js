import { allocation } from 'cosmos-fundraiser'
const { status } = allocation

const state = {
  started: true,
  ended: true,
  overlayMessage: 'The fundraiser has ended.',
  progress: {
    btcRaised: status.btc,
    btcTxCount: status.donations,
    ethRaised: status.eth,
    ethTxCount: 0,
    atomsClaimedBtc: status.atoms,
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
  startFetchInterval ({ dispatch }) {},
  startStatusInterval ({ dispatch }) {}
}

export default {
  state,
  mutations,
  actions
}
