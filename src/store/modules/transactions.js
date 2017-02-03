import transactions from '../json/transactions.json'
import shortid from 'shortid'

const state = transactions

const mutations = {
  addTransaction (state, transaction) {
    state[shortid.generate()] = transaction
    console.log('added new transaction', transaction)
  }
}

export default {
  state,
  mutations
}
