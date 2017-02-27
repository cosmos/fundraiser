<template>
  <module class="module-statistics">
    <header>
      <div class="title">Fundraise Statistics</div>
    </header>
    <progress-bar></progress-bar>
    <div class="components">
      <div class="component">
        <div class="value" :title="num.full(progress.btcRaised)">
          <span class="integer">{{ num.int(progress.btcRaised) }}</span><span class="fraction">{{ num.frac(progress.btcRaised) }}</span>
        </div>
        <div class="unit">BTC Raised</div>
      </div>
      <div class="component">
        <div class="value" :title="num.full(progress.ethRaised)">
          <span class="integer">{{ num.int(progress.ethRaised) }}</span><span class="fraction">{{ num.frac(progress.ethRaised) }}</span>
        </div>
        <div class="unit">ETH Raised</div>
      </div>
      <div class="component">
        <div class="value" :title="num.int(atomsPurchased)">
          <span class="integer">{{ num.short(atomsPurchased) }}</span>
        </div>
        <div class="unit">Atoms Bought</div>
      </div>
      <div class="component">
        <div class="value">
          <span class="integer">{{ num.int(progress.investors) }}<span>
        </div>
        <div class="unit">Investors</div>
      </div>
    </div>
  </module>
</template>

<script>
import Module from './Module'
import ProgressBar from './ProgressBar'
import { mapGetters } from 'vuex'
import num from '../scripts/num.js'
export default {
  name: 'module-statistics',
  components: {
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

.module.module-statistics
  .pb-container
    border-bottom 1px dotted bc

  .components
    flex-flow row wrap
    padding 0
    .component
      flex 0 0 50%
      border-right 1px dotted bc
      border-bottom 1px dotted bc
      &:nth-child(2)
        border-right none
      &:nth-child(3)
        border-bottom none
      &:nth-child(4)
        border-right none
        border-bottom none

@media screen and (min-width: 768px)
  .module.module-statistics
    .components
      flex-flow row wrap
      padding 0
      .component
        flex 0 0 25%
        border-bottom none
        &:nth-child(2)
          border-right 1px dotted bc
</style>
