const state = {
  ATOM_FOR_BTC: 2000,
  // DECREASE_AMOUNT_PER_DAY: 30,
  MIN_ATOM_FOR_BTC: 1337.07714935,
  FUNDRAISING_ADDRESS: 'TODO',
  SATOSHIS_IN_BTC: 100000000,
  START_DATETIME: '2017-02-28 00:00:00',
  // DECREASE_AFTER: 14,
  // ENDS_AFTER: 42,
  ATOMSALE_URL: 'https://sale.cosmos.network',
  SELF_URL: 'https://cosmos.network/',
  BLOCKCHAIN_URL: 'https://blockchain.info',
  BLOCKCHAIN_API: '5b846ae8-eb56-4c14-aae9-bd13056b6df7',
  MAX_ATOM_TO_BUY: 1000000,
  SALE_BEGUN: true
}

const mutations = {
  setSaleBegun (state, value) {
    state.SALE_BEGUN = value
  }
}

export default {
  state,
  mutations
}
