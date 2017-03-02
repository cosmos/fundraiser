import shortid from 'shortid'
import data from '../json/donations.json'

const state = {
  all: data
}

const mutations = {
  addDonation (state, donation) {
    console.log('submitting donation', donation)
    state.all[shortid.generate()] = donation
  }
}

export default {
  state,
  mutations
}
