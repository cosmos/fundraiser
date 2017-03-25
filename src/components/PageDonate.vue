<template>
<div class="page page-donate">
  <div class="ni-forms">
    <create-wallet-01 v-if="donation.progress === 1"></create-wallet-01>
    <create-wallet-02 v-if="donation.progress === 2"></create-wallet-02>
    <input-wallet v-if="donation.progress === 'input'"></input-wallet>
    <donate-btc-01 v-if="donation.progress === 3 && donation.currency === 'BTC'"></donate-btc-01>
    <donate-btc-02 v-if="donation.progress === 4 && donation.currency === 'BTC'"></donate-btc-02>
    <donate-eth v-if="donation.progress === 3 && donation.currency === 'ETH'"></donate-eth>
  </div>
  <modal-agreement v-if="!donation.agreed"></modal-agreement>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Btn from '@nylira/vue-button'
import PageHeader from '@nylira/vue-page-header'
import CreateWallet01 from './CreateWallet01'
import CreateWallet02 from './CreateWallet02'
import InputWallet from './InputWallet'
import DonateBtc01 from './DonateBtc01'
import DonateBtc02 from './DonateBtc02'
import DonateEth from './DonateEth'
import ModalAgreement from './ModalAgreement'
export default {
  name: 'page-wallet',
  components: {
    Btn,
    PageHeader,
    CreateWallet01,
    CreateWallet02,
    InputWallet,
    DonateBtc01,
    DonateBtc02,
    DonateEth,
    ModalAgreement
  },
  computed: {
    ...mapGetters(['donation'])
  },
  head: {
    title () {
      return {
        inner: 'Make a Donation',
        separator: '-',
        complement: this.$t('site.internetOfBlockchains')
      }
    }
  },
  mounted () {
    console.log('mounted')
    let currency = this.$route.params.currency.toUpperCase()
    this.setCurrency(currency)
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate', to, from)
    let currency = to.params.currency.toUpperCase()
    this.setCurrency(currency)
    next()
  },
  methods: {
    setCurrency (currency) {
      this.$store.commit('setDonationCurrency', currency)
      if (currency === 'BTC') {
        this.$store.dispatch('fetchBtcDonationFeeRate')
      } else if (currency === 'ETH') {
        this.$store.dispatch('fetchEthDonationAtomRate')
      }
    },
    cancelLeave () {
      this.wantsToLeave = false
      this.leaveDestination = ''
    },
    confirmLeave () {
      this.canLeave = true
      this.$router.push(this.leaveDestination)
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.page-donate
  .ni-form
    margin 0 auto
</style>
