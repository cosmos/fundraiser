<template>
<div class="page page-eth">
  <div class="ni-forms">
    <form-struct width="narrow">
      <module-overlay slot="overlay" v-if="!FUNDRAISE_STARTED"></module-overlay>
      <div slot="title">Donate ETH via Wallet</div>
      <form-group>
        Donate your ETH with simple wallet (e.g. myetherwallet.com, metamask). You should ensure that your account wallet is backed up.
      </form-group>
      <btn
        slot="submit"
        icon="angle-right"
        icon-pos="right"
        value="Start">
      </btn>
    </form-struct>

    <form-struct width="narrow">
      <module-overlay slot="overlay" v-if="!FUNDRAISE_STARTED"></module-overlay>
      <div slot="title">Donate ETH via Third Party</div>
      <form-group>
        Donate your ETH via a third party (e.g. exchange). You'll have to use the transaction data field and insert your own address.
      </form-group>
      <btn
        slot="submit"
        icon="angle-right"
        icon-pos="right"
        value="Start">
      </btn>
    </form-struct>

    <form-struct width="narrow">
      <module-overlay slot="overlay" v-if="!FUNDRAISE_STARTED"></module-overlay>
      <div slot="title">Donate ETH via web3 "dapp"</div>
      <form-group>
        Uses web3.js/parity.js in order to inspect your account and send a transaction. You need to have Metamask, Mist, or Parity Chrome installed.
      </form-group>
      <btn
        slot="submit"
        icon="angle-right"
        icon-pos="right"
        value="Start">
      </btn>
    </form-struct>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import Btn from '@nylira/vue-button'
import FormGroup from './FormGroup'
import FormStruct from './FormStruct'
import Module from './Module'
import ModuleOverlay from './ModuleOverlay'
export default {
  name: 'page-eth',
  components: {
    Btn,
    Module,
    FormStruct,
    FormGroup,
    ModuleOverlay
  },
  computed: {
    FUNDRAISE_STARTED () {
      return Date.now >= moment(this.config.START_DATETIME).millisecond()
    },
    ...mapGetters(['config', 'sessionUser'])
  },
  head: {
    title () {
      return {
        inner: 'Buy Atoms with ETH',
        separator: '-',
        complement: this.$t('site.internetOfBlockchains')
      }
    }
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
    max-width 1024px
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
