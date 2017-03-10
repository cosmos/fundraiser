const { Client } = require('cosmos-fundraiser')
const client = Client(process.env.COSMOS_API_URI)

const state = {
  client,
  user: {
    wallet: ''
  },
  ready: false
}

const mutations = {
  setSessionReady (state) {
    state.ready = true
  }
}

const actions = {
  submitBtcDonationWallet ({ commit, getters }, cb) {
    let { encryptedSeed } = getters.btcDonation
    client.backupWallet(encryptedSeed, (err) => {
      if (err) {
        console.error(err)
        commit('notifyError', {
          title: 'Wallet Backup Error',
          body: 'An error occurred while backing up your wallet.'
        })
        if (cb) cb(err)
        return
      }
      commit('notifyCustom', {
        title: 'Wallet Backed Up',
        body: 'Your encrypted wallet is now backed up in the Cosmos Fundraiser database.'
      })
      if (cb) cb(null)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
