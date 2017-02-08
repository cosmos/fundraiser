<template>
  <div class="page-index">
    <vue-page-header title="Dashboard" type="center"></vue-page-header>
    <div class="modules">
      <module-progress></module-progress>
      <module-balance></module-balance>
      <module-countdown></module-countdown>
      <module-payment v-for="coin in coins" :coin="coin"></module-payment>
      <module-transactions></module-transactions>
    </div> 
  </div>
</template>

<script>
import VuePageHeader from '@nylira/vue-page-header'
import ModuleProgress from './ModuleProgress'
import ModuleBalance from './ModuleBalance'
import ModuleCountdown from './ModuleCountdown'
import ModulePayment from './ModulePayment'
import ModuleTransactions from './ModuleTransactions'
export default {
  name: 'page-index',
  components: {
    VuePageHeader,
    ModuleProgress,
    ModuleBalance,
    ModuleCountdown,
    ModulePayment,
    ModuleTransactions
  },
  data () {
    return {
      coins: [
        {
          name: 'Bitcoin',
          unit: 'BTC',
          minimumPayment: 0.01,
          exchangeRate: 2000,
          address: '1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi',
          qrCode: require('../assets/images/1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi.png')
        },
        {
          name: 'Ethereum',
          unit: 'ETH',
          minimumPayment: 1.00,
          exchangeRate: 20,
          address: '1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi',
          qrCode: require('../assets/images/1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi.png')
        }
      ]
    }
  },
  head: {
    title () {
      return {
        inner: 'Dashboard',
        separator: '-',
        complement: 'Cosmos Fundraise'
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.modules
  display flex
  flex-flow row wrap
  max-width 960px
  margin 0 auto

  padding 0.25rem
  .module
    flex 0 0 100%
    &.module-sm
      flex 0 0 50%
</style>
