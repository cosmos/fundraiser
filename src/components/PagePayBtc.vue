<template>
<div class="page page-fund">
  <page-header title="Pay with BTC" type="center"></page-header>
  <pay-btc-01 v-if="btcTransaction.progress === 1"></pay-btc-01>
  <pay-btc-02 v-if="btcTransaction.progress === 2"></pay-btc-02>
  <pay-btc-03 v-if="btcTransaction.progress === 3"></pay-btc-03>
  <pay-btc-04 v-if="btcTransaction.progress === 4"></pay-btc-04>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
import PageHeader from '@nylira/vue-page-header'
import PayBtc01 from './PayBtc01'
import PayBtc02 from './PayBtc02'
import PayBtc03 from './PayBtc03'
import PayBtc04 from './PayBtc04'
export default {
  name: 'page-fund',
  components: {
    PageHeader,
    PayBtc01,
    PayBtc02,
    PayBtc03,
    PayBtc04
  },
  computed: {
    ...mapGetters(['btcTransaction', 'sessionUser'])
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
    this.$store.commit('resetBtcTransaction')
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.page-fund .ni-page-header
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
