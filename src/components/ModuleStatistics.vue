<template>
  <module class="module-statistics">
    <div slot="title">Fundraise Statistics</div>
    <progress-bar></progress-bar>
    <key-values>
      <key-value>
        <div slot="value" :title="num.full(progress.btcRaised)">
          <span class="integer">{{ num.int(progress.btcRaised) }}</span><span class="fraction">{{ num.frac(progress.btcRaised) }}</span>
        </div>
        <div slot="key">BTC Raised</div>
      </key-value>
      <key-value>
        <div slot="value" :title="num.full(progress.ethRaised)">
          <span class="integer">{{ num.int(progress.ethRaised) }}</span><span class="fraction">{{ num.frac(progress.ethRaised) }}</span>
        </div>
        <div slot="key">ETH Raised</div>
      </key-value>
      <key-value>
        <div slot="value" :title="num.int(atomsPurchased)">
          <span class="integer">{{ num.short(atomsPurchased) }}</span>
        </div>
        <div slot="key">Atoms Claimed</div>
      </key-value>
      <key-value>
        <div slot="value">
          <span class="integer">{{ num.int(progress.donors) }}<span>
        </div>
        <div slot="key">Donors</div>
      </key-value>
    </key-values>
  </module>
</template>

<script>
import { mapGetters } from 'vuex'
import num from '../scripts/num.js'
import KeyValues from './KeyValues'
import KeyValue from './KeyValue'
import Module from './Module'
import ProgressBar from './ProgressBar'
export default {
  name: 'module-statistics',
  components: {
    KeyValue,
    KeyValues,
    Module,
    ProgressBar
  },
  computed: {
    atomsPurchased () {
      let btcTotal = this.progress.btcRaised * this.config.COINS.BTC.EXCHANGE_RATE
      let ethTotal = this.progress.ethRaised * this.config.COINS.ETH.EXCHANGE_RATE
      return ethTotal + btcTotal
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

.module-statistics
  .pb-container
    border-bottom 1px solid bc

  .ni-kvs
    flex-flow row wrap
    padding 0

  .ni-kv
    flex 0 0 50%
    border-right 1px solid bc
    border-bottom 1px solid bc
    &:nth-child(2)
      border-right none
    &:nth-child(3)
      border-bottom none
    &:nth-child(4)
      border-right none
      border-bottom none

@media screen and (min-width: 768px)
  .module-statistics
    .ni-kvs
      flex-flow row wrap
      padding 0
    .ni-kv
      flex 0 0 25%
      border-bottom none
      &:nth-child(2)
        border-right 1px solid bc
</style>
