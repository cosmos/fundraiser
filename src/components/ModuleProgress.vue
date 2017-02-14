<template>
  <module class="module-progress">
    <header>
      <div class="title">Fundraise Progress</div>
    </header>
    <div class="components">
      <div class="component">
        <div class="value"><span class="integer">{{ integerize(btcFunded) }}</span></div>
        <div class="unit">
          <span class="fraction">{{ fractionize(btcFunded) }}</span> BTC
        </div>
      </div>
      <div class="component">
        <div class="value"><span class="integer">{{ integerize(ethFunded) }}</span></div>
        <div class="unit">
          <span class="fraction">{{ fractionize(ethFunded) }}</span> ETH
        </div>
      </div>
      <div class="component">
        <div class="value"><span class="integer">{{ investors }}<span></div>
        <div class="unit">Investors</div>
      </div>
    </div>
  </module>
</template>

<script>
import Module from './Module'
export default {
  components: {
    Module
  },
  data () {
    return {
      btcFunded: 345.530587,
      ethFunded: 27039.342606,
      investors: 1235
    }
  },
  methods: {
    integerize (num) {
      return Math.trunc(num)
    },
    fractionize (num) {
      let value = Math.trunc(num % 1 * 100000) / 100000
      return value.toString().substring(1)
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
