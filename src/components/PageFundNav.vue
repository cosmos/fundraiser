<template>
  <div class="page-fund-nav">
    <div class="step-indicator" :class="{'active': stepOneActive }">
      <div class="key">1</div>
    </div>
    <div class="step-indicator" :class="{'active': stepTwoActive }">
      <div class="key">2</div>
    </div>
    <div class="step-indicator" :class="{'active': stepThreeActive }">
      <div class="key">3</div>
    </div>
    <div class="step-indicator" :class="{'active': stepFourActive }">
      <div class="key">4</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    stepOneActive () { if (this.fund.step === 1) { return true } },
    stepTwoActive () { if (this.fund.step === 2) { return true } },
    stepThreeActive () { if (this.fund.step === 3) { return true } },
    stepFourActive () { if (this.fund.step === 4) { return true } },
    ...mapGetters(['fund'])
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.page-fund-nav
  display flex
  border 1px solid bc
  border-bottom none
  .step-indicator
    flex 1
    font-size 0.75rem
    color light
    text-align center

    &:first-of-type
      border-left none

    &.active
      background lighten(bc,50%)
      color txt
@media screen and (min-width: 400px)
  .page-fund-nav .step-indicator
    font-size x
</style>
