<template>
<div class="page page-btc">
  <div class="ni-forms">
    <fund-btc-01 v-if="btcDonation.progress === 1"></fund-btc-01>
    <fund-btc-02 v-if="btcDonation.progress === 2"></fund-btc-02>
    <fund-btc-03 v-if="btcDonation.progress === 3"></fund-btc-03>
    <fund-btc-04 v-if="btcDonation.progress === 4"></fund-btc-04>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHeader from '@nylira/vue-page-header'
import FundBtc01 from './FundBtc01'
import FundBtc02 from './FundBtc02'
import FundBtc03 from './FundBtc03'
import FundBtc04 from './FundBtc04'
export default {
  name: 'page-btc',
  components: {
    PageHeader,
    FundBtc01,
    FundBtc02,
    FundBtc03,
    FundBtc04
  },
  computed: {
    ...mapGetters(['btcDonation', 'sessionUser'])
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
    /*
    if (!this.sessionUser.signedIn) {
      this.$store.commit('setSessionRequest', this.$route.path)
      this.$router.replace('/signup')
      this.$store.commit(
        'notifyAuthRequired',
        'You must sign up first before you may participate in the fundraise.'
      )
    }
    */
  },
  beforeDestroy () {
    this.$store.commit('resetBtcDonation')
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'


.page-btc
  .ni-form
    margin 0 auto

</style>
