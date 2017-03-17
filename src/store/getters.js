export const sessionClient = state => state.session.client
export const sessionReady = state => state.session.ready

export const config = state => state.config

export const btcDonation = state => state.btcDonation
export const notifications = state => state.notifications

export const donations = state => state.donations.donations.slice(-15)
export const progress = state => state.progress
export const balance = state => state.balance
