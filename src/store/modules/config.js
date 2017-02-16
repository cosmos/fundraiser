const state = {
  // DECREASE_AMOUNT_PER_DAY: 30,
  SATOSHIS_IN_BTC: 100000000,
  START_DATETIME: '2017-03-30 00:00:00',
  // DECREASE_AFTER: 14,
  ENDS_AFTER: 42,
  SALE_URL: 'https://sale.cosmos.network',
  SELF_URL: 'https://cosmos.network/',
  BLOCKCHAIN_URL: 'https://blockchain.info',
  BLOCKCHAIN_API: '5b846ae8-eb56-4c14-aae9-bd13056b6df7',
  MAX_ATOM_TO_BUY: 1000000,
  SALE_BEGUN: true,
  COINS: {
    BTC: {
      NAME: 'Bitcoin',
      UNIT: 'BTC',
      MIN_PAYMENT: 0.01,
      EXCHANGE_RATE: 2000.00,
      ADDRESS: '1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi',
      QR_CODE: require('../../assets/images/1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi.png')
    },
    ETH: {
      NAME: 'Ethereum',
      UNIT: 'ETH',
      MIN_PAYMENT: 1.00,
      EXCHANGE_RATE: 20.00,
      ADDRESS: '1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi',
      QR_CODE: require('../../assets/images/1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi.png')
    }
  }
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
