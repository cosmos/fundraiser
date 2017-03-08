<template>
  <module size="sm" class="module-contrib-total">
    <div slot="title">Total Contributions</div>
    <div class="module-contrib-total-main">
      <key-values>
        <key-value>
          <div slot="value" :title="num.full(btc)">
            <span class="integer">{{ num.int(btc) }}</span></div>
          <div slot="key">BTC raised</div>
        </key-value>
        <key-value>
          <div slot="value" :title="num.full(eth)">
            <span class="integer">{{ num.int(eth) }}</span></div>
          <div slot="key">ETH raised</div>
        </key-value>
      </key-values>
    </div>
    <div slot="footer">
      <div>{{ num.int(atoms) }} atoms claimed total</div>
    </div>
  </module>
</template>

<script>
import { mapGetters } from 'vuex'
import num from '../scripts/num.js'
import KeyValue from './KeyValue'
import KeyValues from './KeyValues'
import Module from './Module'
import Btn from '@nylira/vue-button'
export default {
  name: 'module-contributions-total',
  components: {
    Btn,
    KeyValue,
    KeyValues,
    Module
  },
  computed: {
    atoms () {
      let atomBtc = this.btc * this.config.COINS.BTC.EXCHANGE_RATE
      let atomEth = this.eth * this.config.COINS.ETH.EXCHANGE_RATE
      let total = atomBtc + atomEth
      return num.pretty(total)
    },
    btc () {
      return this.progress.btcRaised
    },
    eth () {
      return this.progress.ethRaised
    },
    ...mapGetters(['progress', 'config'])
  },
  data () {
    return {
      num: num
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.module-contrib-total-main
  display flex
  .ni-kvs
    flex 1
    display flex

    flex-flow row
    justify-content center

    .ni-kv:first-of-type
      border-right 1px solid bc
</style>
