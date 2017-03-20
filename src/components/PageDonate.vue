<template>
<div class="page page-donate">
  <div class="ni-forms">
    <create-wallet-01 v-if="donation.progress === 1"></create-wallet-01>
    <create-wallet-02 v-if="donation.progress === 2"></create-wallet-02>
    <create-wallet-03 v-if="donation.progress === 3"></create-wallet-03>
    <create-wallet-decrypt v-if="donation.progress === 'decrypt'"></create-wallet-decrypt>
    <donate-btc-01 v-if="donation.progress === 4 && donation.currency === 'BTC'"></donate-btc-01>
    <donate-btc-02 v-if="donation.progress === 5 && donation.currency === 'BTC'"></donate-btc-02>
  </div>
  <modal v-if="wantsToLeave">
    <div slot="title">Donation in Progress</div>
    <div>
      You may return at any time to continue with your donation.
    </div>
    <div slot="footer">
      <btn value="Return to Page" @click.native="cancelLeave"></btn>
      <btn value="Finish Donation Later" @click.native="confirmLeave"></btn>
    </div>
  </modal>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Btn from '@nylira/vue-button'
import PageHeader from '@nylira/vue-page-header'
import CreateWallet01 from './CreateWallet01'
import CreateWallet02 from './CreateWallet02'
import CreateWallet03 from './CreateWallet03'
import CreateWalletDecrypt from './CreateWalletDecrypt'
import DonateBtc01 from './DonateBtc01'
import DonateBtc02 from './DonateBtc02'
import Modal from './Modal'
export default {
  name: 'page-wallet',
  components: {
    Btn,
    PageHeader,
    CreateWallet01,
    CreateWallet02,
    CreateWallet03,
    CreateWalletDecrypt,
    DonateBtc01,
    DonateBtc02,
    Modal
  },
  computed: {
    ...mapGetters(['donation'])
  },
  data: () => ({
    wantsToLeave: false,
    canLeave: false,
    leaveDestination: ''
  }),
  created () {
    let currency = window.location.pathname.slice(1).toUpperCase()
    this.$store.commit('setDonationCurrency', currency)
    if (currency === 'BTC') {
      this.$store.dispatch('fetchBtcDonationFeeRate')
    }
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
  beforeRouteLeave (to, from, next) {
    let done =
      (this.donation.currency === 'BTC' && this.donation.progress === 5) ||
      (this.donation.currency === 'ETH' && this.donation.progress === 4)
    if (this.canLeave || done) {
      this.$store.commit('setDonationProgress', 1)
      next(true)
    } else {
      this.leaveDestination = to.path
      this.wantsToLeave = true
    }
  },
  methods: {
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
