import cfr from 'cosmos-fundraiser'

function startDatetime () {
  let date = ''
  if (process.env.NODE_ENV === 'development') date = '2017-03-27 03:00:00'
  if (process.env.NODE_ENV === 'production') date = '2017-04-06 13:00:00'
  return date
}

const state = {
  ENDS_AFTER: 14,
  SALE_URL: 'https://fundraiser.cosmos.network',
  SELF_URL: 'https://cosmos.network/',
  ANNOUNCE_DATETIME: '2017-03-15 07:10:00',
  START_DATETIME: startDatetime(),
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 512,
  CAP_START: 6,              // when cap starts being enforced, after START_DATETIME (in hours)
  CAP_AMOUNT: 0e6,         // cap in ATOMs XXX XXX XXX XXX XXX
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

export default {
  state
}
