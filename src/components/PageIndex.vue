<template>
  <div class="page-index">
    <page-header title="Dashboard" type="center"></page-header>
    <div class="modules">
      <module-statistics></module-statistics>
      <module-balance></module-balance>
      <module-countdown></module-countdown>
      <module-payment v-for="coin in config.COINS" :coin="coin"></module-payment>
      <module-transactions></module-transactions>
    </div> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHeader from '@nylira/vue-page-header'
import ModuleStatistics from './ModuleStatistics'
import ModuleBalance from './ModuleBalance'
import ModuleCountdown from './ModuleCountdown'
import ModulePayment from './ModulePayment'
import ModuleTransactions from './ModuleTransactions'
export default {
  name: 'page-index',
  components: {
    PageHeader,
    ModuleStatistics,
    ModuleBalance,
    ModuleCountdown,
    ModulePayment,
    ModuleTransactions
  },
  computed: {
    ...mapGetters(['config'])
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
    min-height 142px
</style>
