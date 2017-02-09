<template>
  <module class="module-progress">
    <header>
      <div class="title">Fundraise Progress</div>
    </header>
    <div class="body">
      <div class="component">
        <div class="value">{{ btcInteger }}</div>
        <div class="unit">{{ btcFractional }} BTC</div>
      </div>
      <div class="component">
        <div class="value">{{ ethInteger }}</div>
        <div class="unit">{{ ethFractional }} ETH</div>
      </div>
      <div class="component">
        <div class="value">{{ investors }}</div>
        <div class="unit">Investors</div>
      </div>
    </div>
    <!--
    <footer>
      <p><i class="fa fa-circle-o-notch fa-spin"></i> Progress is updated live&hellip;</p>
    </footer>
    -->
  </module>
</template>

<script>
import Module from './Module'
export default {
  computed: {
    btcInteger () {
      return Math.trunc(this.btcFunded)
    },
    btcFractional () {
      let value = Math.trunc(this.btcFunded % 1 * 100000) / 100000
      return value.toString().substring(1)
    },
    ethInteger () {
      return Math.trunc(this.ethFunded)
    },
    ethFractional () {
      let value = Math.trunc(this.ethFunded % 1 * 100000) / 100000
      return value.toString().substring(1)
    }
  },
  components: {
    Module
  },
  data () {
    return {
      btcFunded: 345.530587,
      ethFunded: 27039.342606,
      investors: 1235
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.module-progress
  padding 0.25rem
  min-width 0

  .body
    display flex
    flex-flow column
    .component
      flex 1
      padding 0.5rem 0.75rem

      display flex
      align-items center


@media screen and (min-width: 400px)
  .module-progress
    .body
      display flex
      flex-flow row
      .component
        flex 1
        border-right 1px dotted bc
        &:last-of-type
          border-right none
</style>
