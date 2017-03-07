const state = {
  ENDS_AFTER: 42,
  SALE_URL: 'https://sale.cosmos.network',
  SELF_URL: 'https://cosmos.network/',
  START_DATETIME: '2017-03-30 00:00:00',
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 512,
  ATOM: {
    MIN_BUY: 20,
    MAX_BUY: 1000000
  },
  COINS: {
    BTC: {
      ADDRESS: '1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi',
      EXCHANGE_RATE: 2000,
      MIN_DONATION: 0.006,
      MAX_DONATION: 500,
      NAME: 'Bitcoin',
      UNIT: 'BTC',
      SATOSHIS_IN_BTC: 100000000
    },
    ETH: {
      ADDRESS: '1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi',
      EXCHANGE_RATE: 20,
      MIN_DONATION: 1,
      MAX_DONATION: 50000,
      NAME: 'Ethereum',
      UNIT: 'ETH'
    }
  }
}

const mutations = {}

export default {
  state,
  mutations
}
