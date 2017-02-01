<template>
<div class="page page-fund">
  <vue-page-header
    :title="$t('siteFund.titleEth')"
    subtitle="There are three ways to send ETH to the contribution smart contract."
    type="center">
  </vue-page-header>
  <div class="methods">
    <div class="method">
      <div class="text">
        <div class="title">Send ETH via Wallet</div>
        <div class="description">
          Send your ETH with simple wallet (e.g. myetherwallet.com, metamask). You should ensure that your account wallet is backed up.
        </div>
      </div>
      <vue-button btn-value="Start Walkthrough"></vue-button>
    </div>
    <div class="method">
      <div class="text">
        <div class="title">Send ETH via Third Party</div>
        <div class="description">
          Send your ETH via a third party (e.g. exchange). You'll have to use the transaction data field and insert your own address.
        </div>
      </div>
      <vue-button btn-value="Start Walkthrough"></vue-button>
    </div>
    <div class="method">
      <div class="text">
        <div class="title">Send ETH via web3 "dapp"</div>
        <div class="description">
          Uses web3.js/parity.js in order to inspect your account and send a transaction. You need to have Metamask, Mist, or Parity Chrome installed.
        </div>
      </div>
      <vue-button btn-value="Start Walkthrough"></vue-button>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
import VuePageHeader from '@nylira/vue-page-header'
import VueButton from '@nylira/vue-button'
export default {
  name: 'page-fund',
  components: {
    VuePageHeader,
    VueButton
  },
  head: {
    title () {
      return {
        inner: this.$t('siteFund.titleEth'),
        separator: '-',
        complement: this.$t('site.internetOfBlockchains')
      }
    }
  },
  mounted () {
    if (!firebase.auth().currentUser) {
      this.$store.commit('setSessionRequest', this.$route.path)
      this.$router.push('/signup')
      this.$store.commit(
        'notifyAuthRequired',
        'You must sign up first before you may participate in the fundraise.'
      )
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.method
  border-top 1px solid bc
  padding 1rem
  background c-app-fg
  display flex
  flex-flow column nowrap
  &:last-of-type
    border-bottom 1px solid bc

  .text
    flex 1

    .title
      font-weight 500
      font-size 1.25rem
    .description
      color dim
      margin-bottom 1rem

  .pz-button
    max-width 14rem
    width 100%

@media screen and (min-width: 360px)
  .method
    padding 1.5rem

@media screen and (min-width: 640px)
  .method
    max-width 40rem
    border 1px solid bc
    margin 0 auto 1rem

@media screen and (min-width: 960px)
  .methods
    display flex
    padding 0 0.5rem
    max-width 75rem
    margin 0 auto

  .method
    max-width 40rem
    border 1px solid bc
    margin 0 0.5rem

    align-items center
</style>
