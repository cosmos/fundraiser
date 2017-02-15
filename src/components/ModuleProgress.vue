<template>
  <module class="module-progress">
    <header>
      <div class="title">Fundraise Progress</div>
    </header>
    <div class="components">
      <div class="component">
        <div class="value" :title="num.full(progress.btcRaised)">
          <span class="integer">{{ num.int(progress.btcRaised) }}</span><span class="fraction">{{ num.frac(progress.btcRaised) }}</span>
        </div>
        <div class="unit">BTC</div>
      </div>
      <div class="component">
        <div class="value" :title="num.full(progress.ethRaised)">
          <span class="integer">{{ num.int(progress.ethRaised) }}</span><span class="fraction">{{ num.frac(progress.ethRaised) }}</span>
        </div>
        <div class="unit">ETH</div>
      </div>
      <div class="component">
        <div class="value"><span class="integer">{{ progress.investors }}<span></div>
        <div class="unit">Investors</div>
      </div>
    </div>
  </module>
</template>

<script>
import Module from './Module'
import { mapGetters } from 'vuex'
import num from '../scripts/num.js'
export default {
  components: {
    Module
  },
  computed: {
    ...mapGetters(['progress'])
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

@media screen and (min-width: 360px)
  .module.module-progress
    .components
      flex-flow row
      .component
        border-right 1px dotted bc
        &:last-of-type
          border-right none
</style>
