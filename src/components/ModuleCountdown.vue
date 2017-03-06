<template>
  <module size="sm" class="module-countdown">
    <div slot="title">Fundraise Ends In</div>
    <countdown :date="END_DATETIME" units="short"></countdown>
    <div slot="footer">
      Fundraise ends on {{ END_DATEFRIENDLY }}.
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
    END_DATEFRIENDLY () {
      return moment(this.END_DATETIME).format('LL')
    },
    ...mapGetters(['config'])
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.module-countdown
  .ni-countdown
    padding 0 5vw
    .ni-kvs
      display flex
      flex-flow row !important
      flex 1
    .ni-kv
      max-width 5rem
</style>
