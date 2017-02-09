<template>
  <module size="sm">
    <header>
      <div class="title">Fundraise Ends In</div>
    </header>
    <div class="body">
      <countdown date="April 31, 2017" units="short"></countdown>
    </div>
    <!--
    <footer>
      <p>Fundraise ends in 545 hours 59 min 9 sec</p>
    </footer>
    -->
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

.ni-countdown
  display flex
  justify-content center
</style>
