<template>
<div class="page page-btc">
  <div class="ni-forms">
    <fund-btc-01 v-if="btcDonation.progress === 1"></fund-btc-01>
    <fund-btc-02 v-if="btcDonation.progress === 2"></fund-btc-02>
    <fund-btc-03 v-if="btcDonation.progress === 3"></fund-btc-03>
    <fund-btc-decrypt v-if="btcDonation.progress === 'decrypt'"></fund-btc-decrypt>
    <fund-btc-04 v-if="btcDonation.progress === 4"></fund-btc-04>
  </div>
  <modal v-if="wantsToLeave">
    <div slot="title">Canceling Donation</div>
    <div>
      Leaving this page will completely reset the current donation progress. Are you sure you want to cancel the donation?
    </div>
    <div slot="footer">
      <btn value="Return to Page" @click.native="cancelLeave"></btn>
      <btn value="Yes, Cancel Donation" @click.native="confirmLeave"></btn>
    </div>
  </modal>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Btn from '@nylira/vue-button'
import PageHeader from '@nylira/vue-page-header'
import FundBtc01 from './FundBtc01'
import FundBtc02 from './FundBtc02'
import FundBtc03 from './FundBtc03'
import FundBtcDecrypt from './FundBtcDecrypt'
import FundBtc04 from './FundBtc04'
import Modal from './Modal'
export default {
  name: 'page-btc',
  components: {
    Btn,
    PageHeader,
    FundBtc01,
    FundBtc02,
    FundBtc03,
    FundBtcDecrypt,
    FundBtc04,
    Modal
  },
  computed: {
    ...mapGetters(['btcDonation', 'sessionUser'])
  },
  data: () => ({
    wantsToLeave: false,
    canLeave: false,
    leaveDestination: ''
  }),
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
  beforeRouteLeave (to, from, next) {
    if (this.canLeave) {
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
      this.$store.commit('resetBtcDonation')
      this.$store.commit('notifyCustom', { title: 'Donation Canceled', body: `Your donation information has been wiped for security reasons. Try again soon.` })
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.page-btc
  .ni-form
    margin 0 auto

</style>
