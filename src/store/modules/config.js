import cfr from 'cosmos-fundraiser'

function startDatetime () {
  if (process.env.NODE_ENV === 'development') return '2017-04-05 08:00:00'
  if (process.env.NODE_ENV === 'production') return '2017-04-06 13:00:00'
}

const state = {
  ENDS_AFTER: 14,
  FUNDRAISER_URL: 'https://fundraiser.cosmos.network',
  SELF_URL: 'https://cosmos.network/',
  TIMEZONE: 'America/Los_Angeles',
  ANNOUNCE_DATETIME: '2017-03-15 07:10:00',
  START_DATETIME: startDatetime(),
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 512,
  CAP_START: 6,         // cap enforced X hours after START_DATETIME
  CAP_AMOUNT: 10000000, // cap in $X USD
  ATOM: {
  },
  COINS: {
    BTC: {
      EXCHANGE_RATE: cfr.bitcoin.ATOMS_PER_BTC,
      MIN_DONATION: cfr.bitcoin.MINIMUM_AMOUNT / 100000000,
      MAX_DONATION: 1000,
      NAME: 'Bitcoin',
      UNIT: 'BTC'
    },
    ETH: {
      MIN_DONATION: cfr.ethereum.MIN_DONATION,
      MAX_DONATION: 20000,
      NAME: 'Ethereum',
      UNIT: 'ETH'
    }
  }
}

const mutations = {
  setDebugStartDate (state, date) {
    state.START_DATETIME = new Date(date).toISOString()
  }
}

export default {
  state,
  mutations
}
