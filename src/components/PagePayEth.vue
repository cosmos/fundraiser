<template>
<div class="page page-eth">
  <div class="ni-forms">
    <custom-form width="narrow">
      <div slot="title">Send ETH via Wallet</div>
      <form-group>
        Send your ETH with simple wallet (e.g. myetherwallet.com, metamask). You should ensure that your account wallet is backed up.
      </form-group>
      <btn
        slot="submit"
        icon="angle-right"
        icon-pos="right"
        value="Start">
      </btn>
    </custom-form>

    <custom-form width="narrow">
      <div slot="title">Send ETH via Third Party</div>
      <form-group>
        Send your ETH via a third party (e.g. exchange). You'll have to use the transaction data field and insert your own address.
      </form-group>
      <btn
        slot="submit"
        icon="angle-right"
        icon-pos="right"
        value="Start">
      </btn>
    </custom-form>

    <custom-form width="narrow">
      <div slot="title">Send ETH via web3 "dapp"</div>
      <form-group>
        Uses web3.js/parity.js in order to inspect your account and send a transaction. You need to have Metamask, Mist, or Parity Chrome installed.
      </form-group>
      <btn
        slot="submit"
        icon="angle-right"
        icon-pos="right"
        value="Start">
      </btn>
    </custom-form>
  </div>
</div>
</template>

<script>
import PageHeader from '@nylira/vue-page-header'
import Module from './Module'
import Btn from '@nylira/vue-button'
import { mapGetters } from 'vuex'
import CustomForm from './Form'
import FormGroup from './FormGroup'
export default {
  name: 'page-eth',
  components: {
    PageHeader,
    Btn,
    Module,
    CustomForm,
    FormGroup
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

.page-eth .ni-form
  .ni-form-footer
    .ni-btn-wrapper
      flex 1

@media screen and (min-width: 768px)
  .page-eth .ni-forms
    width 1024px
    margin 0 auto
    display flex
    flex-flow row wrap
    align-items stretch
    justify-content center

  .page-eth .ni-form
    flex 0 0 50%

@media screen and (min-width: 1024px)
  .page-eth .ni-form
    flex 0 0 33.3333%
</style>

