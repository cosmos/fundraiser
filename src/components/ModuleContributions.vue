<template>
  <module size="sm" class="module-contributions">
    <div slot="title">Your Contributions</div>
    <div class="module-contributions-main">
      <key-values>
        <key-value>
          <div slot="value" :title="num.full(btc)">
            <span class="integer">{{ num.int(btc) }}</span><span class="fraction">{{ num.frac(btc) }}</span></div>
          <div slot="key">BTC</div>
        </key-value>
        <key-value>
          <div slot="value" :title="num.full(eth)">
            <span class="integer">{{ num.int(eth) }}</span><span class="fraction">{{ num.frac(eth) }}</span></div>
          <div slot="key">ETH</div>
        </key-value>
      </key-values>
    </div>
    <div slot="footer">
      <div><strong>{{ num.pretty(atoms) }}</strong> Atoms Claimed</div>
      <div><a href="#">Download Wallet</a></div>
    </div>
  </module>
</template>

<script>
import { mapGetters } from 'vuex'
import { reduce, filter } from 'lodash'
import num from '../scripts/num.js'
import KeyValue from './KeyValue'
import KeyValues from './KeyValues'
import Module from './Module'
import Btn from '@nylira/vue-button'
export default {
  name: 'module-contributions',
  components: {
    Btn,
    KeyValue,
    KeyValues,
    Module
  },
  computed: {
    atoms () {
      return reduce(this.donations, (acc, t) => acc + t.atoms, 0)
    },
    btc () {
      let donations = filter(this.donations, (d) => d.type === 'btc')
      let atoms = reduce(donations, (acc, t) => acc + t.atoms, 0)
      return atoms / this.config.COINS.BTC.EXCHANGE_RATE
    },
    eth () {
      let donations = filter(this.donations, (d) => d.type === 'eth')
      let atoms = reduce(donations, (acc, t) => acc + t.atoms, 0)
      return atoms / this.config.COINS.ETH.EXCHANGE_RATE
    },
    ...mapGetters(['donations', 'sessionUser', 'config'])
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

.module-contributions-main
  display flex
  padding 0 1rem
  .ni-kvs
    flex 1
    display flex

    flex-flow row
    justify-content center

@media screen and (min-width: 768px)
  .module-contributions-main
    padding 0 3rem
</style>
