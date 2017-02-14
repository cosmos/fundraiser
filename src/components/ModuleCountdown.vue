<template>
  <module size="sm" class="module-countdown">
    <header>
      <div class="title">Fundraise Ends In</div>
    </header>
    <countdown date="April 31, 2017" units="short"></countdown>
    </div>
  </module>
</template>

<script>
import Module from './Module'
import Countdown from '@nylira/vue-countdown'
export default {
  components: {
    Module,
    Countdown
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.module.module-countdown
  .ni-countdown
    flex-flow row
    .component
      flex 1
      max-width 4rem
</style>
