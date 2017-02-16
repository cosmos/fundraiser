<template>
<div class="page page-fund">
  <page-header
    title="Pay with ETH"
    subtitle="There are three ways to send ETH to the contribution smart contract."
    type="center">
  </page-header>
  <div class="methods">
    <div class="method">
      <div class="text">
        <div class="title">Send ETH via Wallet</div>
        <div class="description">
          Send your ETH with simple wallet (e.g. myetherwallet.com, metamask). You should ensure that your account wallet is backed up.
        </div>
      </div>
      <btn value="Start Walkthrough"></btn>
    </div>
    <div class="method">
      <div class="text">
        <div class="title">Send ETH via Third Party</div>
        <div class="description">
          Send your ETH via a third party (e.g. exchange). You'll have to use the transaction data field and insert your own address.
        </div>
      </div>
      <btn value="Start Walkthrough"></btn>
    </div>
    <div class="method">
      <div class="text">
        <div class="title">Send ETH via web3 "dapp"</div>
        <div class="description">
          Uses web3.js/parity.js in order to inspect your account and send a transaction. You need to have Metamask, Mist, or Parity Chrome installed.
        </div>
      </div>
      <btn value="Start Walkthrough"></btn>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
import PageHeader from '@nylira/vue-page-header'
import Btn from '@nylira/vue-button'
export default {
  name: 'page-fund',
  components: {
    PageHeader,
    Btn
  },
  head: {
    title () {
      return {
        inner: 'Buy Atoms with ETH',
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

  .ni-btn
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
