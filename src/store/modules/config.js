const state = {
  ENDS_AFTER: 14,
  SALE_URL: 'https://fundraiser.cosmos.network',
  SELF_URL: 'https://cosmos.network/',
  TIMEZONE: 'America/Los_Angeles',
  ANNOUNCE_DATETIME: '2017-03-15 07:10:00',
  START_DATETIME: '2017-03-20 13:00:00',
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 512,
  ATOM: {
    MIN_BUY: 20,
    MAX_BUY: 1000000
  },
  COINS: {
    BTC: {
      ADDRESS: '1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi',
      EXCHANGE_RATE: 10000,
      MIN_DONATION: 0.006,
      MAX_DONATION: 100,
      NAME: 'Bitcoin',
      UNIT: 'BTC',
      USD: 1000
    },
    ETH: {
      ADDRESS: '1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi',
      EXCHANGE_RATE: 400,
      MIN_DONATION: 1,
      MAX_DONATION: 2500,
      NAME: 'Ethereum',
      UNIT: 'ETH',
      USD: 40
    }
  }
}

export default {
  state
}
