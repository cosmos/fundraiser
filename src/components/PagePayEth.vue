<template>
<div class="page page-fund">
  <div class="modules">
    <module>
      <header>
        <div class="title">Send ETH via Wallet</div>
      </header>
      <div class="body">
        <div class="description">
          Send your ETH with simple wallet (e.g. myetherwallet.com, metamask). You should ensure that your account wallet is backed up.
        </div>
      </div>
      <footer>
        <btn icon="angle-right" icon-pos="right" value="Start"></btn>
      </footer>
    </module>

    <module class="container">
      <header>
        <div class="title">Send ETH via Third Party</div>
      </header>
      <div class="body">
        <div class="description">
          Send your ETH via a third party (e.g. exchange). You'll have to use the transaction data field and insert your own address.
        </div>
      </div>
      <footer>
        <btn icon="angle-right" icon-pos="right" value="Start"></btn>
      </footer>
    </module>

    <module>
      <header>
        <div class="title">Send ETH via web3 "dapp"</div>
      </header>
      <div class="body">
        <div class="description">
          Uses web3.js/parity.js in order to inspect your account and send a transaction. You need to have Metamask, Mist, or Parity Chrome installed.
        </div>
      </div>
      <footer>
        <btn icon="angle-right" icon-pos="right" value="Start"></btn>
      </footer>
    </module>
  </div>
</div>
</template>

<script>
import PageHeader from '@nylira/vue-page-header'
import Module from './Module'
import Btn from '@nylira/vue-button'
import { mapGetters } from 'vuex'
export default {
  name: 'page-fund',
  components: {
    PageHeader,
    Btn,
    Module
  },
  computed: {
    ...mapGetters(['sessionUser'])
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
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

@media screen and (min-width: 768px)
  .page-fund .modules
    display flex
    flex-flow row wrap
    align-items stretch
    .module
      flex 0 0 50%
      display flex
      .container
        flex 1
        display flex
        flex-flow column
        .body
          flex 1
          display flex

@media screen and (min-width: 1024px)
  .page-fund .modules
    display flex
    flex-flow row wrap
    .module
      flex 0 0 33.333%
</style>

