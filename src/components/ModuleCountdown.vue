<template>
  <module size="sm" class="module-countdown">
    <header>
      <div class="title">Fundraise Ends In</div>
    </header>
    <countdown :date="END_DATETIME" units="short"></countdown>
    </div>
  </module>
</template>

<script>
import { mapGetters } from 'vuex'
import Module from './Module'
import Countdown from '@nylira/vue-countdown'
import moment from 'moment'
export default {
  components: {
    Module,
    Countdown
  },
  computed: {
    END_DATETIME () {
      const START_DATETIME = this.config.START_DATETIME
      const ENDS_AFTER = this.config.ENDS_AFTER
      return moment(START_DATETIME).add(ENDS_AFTER, 'days')._d
    },
    ...mapGetters(['config'])
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
      max-width 5rem
</style>
