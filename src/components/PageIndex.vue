<template>
  <div class="page-index page">
    <cover-sale></cover-sale>
  </div> 
</template>

<script>
import { mapGetters } from 'vuex'
import VueCountdown from '@nylira/vue-countdown'
import CoverSale from './CoverSale'
export default {
  name: 'page-index',
  components: {
    VueCountdown,
    CoverSale
  },
  computed: {
    saleBegun () {
      return this.config.SALE_BEGUN
    },
    ...mapGetters(['config'])
  },
  head: {
    title () {
      return {
        inner: 'Cosmos Fundraising',
        separator: '-',
        complement: this.$t('site.internetOfBlockchains')
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.page-index
  border-bottom 0.25rem solid c-app-fg
</style>
