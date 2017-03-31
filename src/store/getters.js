export const sessionClient = state => state.session.client
export const sessionReady = state => state.session.ready

export const config = state => state.config

export const donation = state => state.donation
export const notifications = state => state.notifications

export const fundraiserEnded = state => state.stats.status.fundraiserEnded
export const overlayMessage = state => state.stats.overlayMessage
export const donations = state => state.stats.donations.slice(0, 15)
export const txCount = state =>
  state.stats.progress.btcTxCount + state.stats.progress.ethTxCount
export const atomsClaimed = state =>
  state.stats.progress.atomsClaimedBtc + state.stats.progress.atomsClaimedEth
export const progress = state => state.stats.progress
export const balance = state => state.balance

export const docs = state => state.docs
