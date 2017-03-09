<template>
  <module class="module-statistics">
    <div slot="title">Fundraise Statistics</div>
    <progress-bar></progress-bar>
    <key-values>
      <key-value>
        <div slot="value" :title="num.full(progress.ethRaised)">
          <span class="integer">${{ num.int(fundAmount) }}</span>
        </div>
        <div slot="key">of $10M goal</div>
      </key-value>
      <key-value>
        <div slot="value">
          <span class="integer">{{ num.int(progress.donors) }}<span>
        </div>
        <div slot="key">donors</div>
      </key-value>
      <time-remaining :date="END_DATETIME"></time-remaining>
      <key-value>
        <div slot="value" :title="num.int(atomsPurchased)">
          <span class="integer">{{ num.short(atomsPurchased) }}</span>
        </div>
        <div slot="key">atoms claimed</div>
      </key-value>
    </key-values>
  </module>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import num from '../scripts/num.js'
import KeyValues from './KeyValues'
import KeyValue from './KeyValue'
import Module from './Module'
import ProgressBar from './ProgressBar'
import TimeRemaining from './TimeRemaining'
export default {
  name: 'module-statistics',
  components: {
    KeyValue,
    KeyValues,
    Module,
    ProgressBar,
    TimeRemaining
  },
  computed: {
    END_DATETIME () {
      const START_DATETIME = this.config.START_DATETIME
      const ENDS_AFTER = this.config.ENDS_AFTER
      return moment(START_DATETIME).add(ENDS_AFTER, 'days')._d
    },
    fundAmount () {
      let btcTotal = this.progress.btcRaised * this.config.COINS.BTC.USD
      let ethTotal = this.progress.ethRaised * this.config.COINS.ETH.USD
      return ethTotal + btcTotal
    },
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
  .ni-module-footer
    display none

  .pb-container
    border-bottom 1px solid bc

  .ni-kvs
    flex-flow row wrap
    padding 0

  .ni-kv
    flex 0 0 50% !important
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
      flex 0 0 25% !important
      border-bottom none
      &:nth-child(2)
        border-right 1px solid bc
</style>
