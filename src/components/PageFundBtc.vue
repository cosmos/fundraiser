<template>
<div class="page page-fund">
  <vue-page-header title="Pay with BTC" subtitle="Purchase Cosmos Atoms with Bitcoin." type="center"></vue-page-header>
  <fund-btc-01 v-if="fundBtc.progress === 1"></fund-btc-01>
  <fund-btc-02 v-if="fundBtc.progress === 2"></fund-btc-02>
  <fund-btc-03 v-if="fundBtc.progress === 3"></fund-btc-03>
  <fund-btc-04 v-if="fundBtc.progress === 4"></fund-btc-04>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
import VuePageHeader from '@nylira/vue-page-header'
import FundBtc01 from './FundBtc01'
import FundBtc02 from './FundBtc02'
import FundBtc03 from './FundBtc03'
import FundBtc04 from './FundBtc04'
export default {
  name: 'page-fund',
  components: {
    VuePageHeader,
    FundBtc01,
    FundBtc02,
    FundBtc03,
    FundBtc04
  },
  computed: {
    ...mapGetters(['fundBtc', 'sessionUser'])
  },
  head: {
    title () {
      return {
        inner: 'Buy Atoms with BTC',
        separator: '-',
        complement: this.$t('site.internetOfBlockchains')
      }
    }
  },
  beforeMount () {
    let self = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        self.$store.commit('setSessionRequest', self.$route.path)
        self.$router.replace('/signup')
        self.$store.commit(
          'notifyAuthRequired',
          'You must sign up first before you may participate in the fundraise.'
        )
      }
    })
  },
  beforeDestroy () {
    this.$store.commit('resetFundBtc')
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.page-fund .pz-page-header
  border-bottom none

.page-fund .form
  max-width 32rem
  margin 0 auto

.step
  border-bottom 1px solid bc
  padding 0.5rem 0
  .step-title
    font-weight bold
    padding 0 1rem
</style>
