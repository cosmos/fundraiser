import shortid from 'shortid'
import data from '../json/transactions.json'

const state = {
  all: data
}

const mutations = {
  addTransaction (state, transaction) {
    console.log('submitting transaction', transaction)
    state.all[shortid.generate()] = transaction
  }
}

export default {
  state,
  mutations
}
