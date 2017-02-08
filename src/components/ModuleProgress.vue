<template>
  <module class="module-progress">
    <header>
      <div class="title">Fundraise Progress</div>
    </header>
    <div class="status">
      <div class="var">
        <div class="value">345<span class="dec">.53058</span></div>
        <div class="unit">BTC</div>
      </div>
      <div class="var">
        <div class="value">27,343<span class="dec">.59284</span></div>
        <div class="unit">ETH</div>
      </div>
      <div class="var">
        <div class="value">1,235</div>
        <div class="unit">Investors</div>
      </div>
    </div>
    <footer>
      <p><i class="fa fa-circle-o-notch fa-spin"></i> Progress is updated live&hellip;</p>
    </footer>
  </module>
</template>

<script>
import Module from './Module'
export default {
  components: {
    Module
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.module-progress
  padding 0.25rem
  min-width 0

  .status
    background c-app-fg
    padding 0.25rem 0
    .var
      padding 0.5rem 0.75rem

      display flex
      align-items center

      .value
        flex 1
        font-size 1.25rem
        line-height 1
        color mcolor
        .dec
          color dim
      .unit
        color light
        text-transform uppercase

@media screen and (min-width: 720px)
  .module-progress
    .status
      display flex
      padding 0
      .var
        flex 1
        flex-flow column
        padding 1.5rem 0
        border-right 1px dotted bc
        &:last-of-type
          border-right none
        .value
          font-size 2rem
          margin-bottom 0.5rem
        .unit
          font-size 1.25rem
</style>
