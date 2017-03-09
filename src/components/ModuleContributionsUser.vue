<template>
  <module size="sm" class="module-contributions">
    <module-overlay slot="overlay" v-if="!FUNDRAISE_STARTED"></module-overlay>
    <div slot="title">Your Contributions</div>
    <div class="module-contributions-main">
      <key-values>
        <key-value>
          <div slot="value" :title="num.full(btc)">{{ num.pretty(btc) }}</div>
          <div slot="key">BTC</div>
        </key-value>
        <key-value>
          <div slot="value" :title="num.full(eth)">{{ num.pretty(eth) }}</div>
          <div slot="key">ETH</div>
        </key-value>
      </key-values>
    </div>
    <div slot="footer">
      <div>{{ num.int(atoms) }} atoms claimed by you</div>
    </div>
  </module>
</template>

<script>
import { mapGetters } from 'vuex'
import { reduce, filter } from 'lodash'
import moment from 'moment'
import num from '../scripts/num.js'
import KeyValue from './KeyValue'
import KeyValues from './KeyValues'
import Module from './Module'
import ModuleOverlay from './ModuleOverlay'
import Btn from '@nylira/vue-button'
export default {
  name: 'module-contrib-user',
  components: {
    Btn,
    KeyValue,
    KeyValues,
    Module,
    ModuleOverlay
  },
  computed: {
    FUNDRAISE_STARTED () {
      return Date.now >= moment(this.config.START_DATETIME).millisecond()
    },
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
    ...mapGetters(['donations', 'config'])
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

  .ni-kvs
    flex 1
    display flex
    flex-flow row
    justify-content center

    .ni-kv:first-of-type
      border-right 1px solid bc
</style>
