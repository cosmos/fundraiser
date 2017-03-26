<template>
  <header class="ni-ph">
    <div class="ni-ph-container">
      <div class="ni-ph-title">Cosmos Fundraiser</div>
      <key-values>
        <time-remaining
          type="cap"
          :date="END_HIDDEN_DATETIME"
          :started="FUNDRAISE_STARTED">
        </time-remaining>
        <time-remaining
          :date="END_DATETIME"
          :started="FUNDRAISE_STARTED">
        </time-remaining>
      </key-values>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import TimeRemaining from './TimeRemaining'
import KeyValues from './KeyValues'
export default {
  name: 'page-header',
  components: {
    KeyValues,
    TimeRemaining
  },
  computed: {
    FUNDRAISE_STARTED () {
      return Date.now() >= moment(this.config.START_DATETIME).valueOf()
    },
    END_HIDDEN_DATETIME () {
      if (this.FUNDRAISE_STARTED) {
        return moment(this.config.START_DATETIME)
          .add(this.config.CAP_START, 'hours')._d
      } else {
        return this.config.START_DATETIME
      }
    },
    END_DATETIME () {
      if (this.FUNDRAISE_STARTED) {
        return moment(this.config.START_DATETIME)
          .add(this.config.ENDS_AFTER, 'days')._d
      } else {
        return this.config.START_DATETIME
      }
    },
    ...mapGetters(['config'])
  },
  methods: {
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.ni-ph

  .ni-ph-container
    max-width 1024px
    margin 0 auto
    padding 0 0.75rem

  .ni-ph-title
    font-size 1.5rem
    font-weight 600
    padding 1rem 0.25rem
    border-bottom 1px solid bc

    display flex
    align-items center
    justify-content center

  .ni-kvs
    background transparent
    display flex
    flex-flow row nowrap
    padding 0
    border-bottom 1px solid bc
    .ni-kv
      flex 0 0 50%
      border-right 1px solid bc
    .ni-kv:last-of-type
      border-right none

@media screen and (min-width: 768px)
  .ni-ph
    .ni-ph-title
      font-size 2rem
      padding 1.5rem 0.25rem

@media screen and (min-width: 1024px)
  .ni-ph
    margin-top 1rem
    border-top 1px solid bc
    border-bottom 1px solid bc
    .ni-ph-container
      display flex
      flex-flow row nowrap
    .ni-ph-title, .ni-kvs
      flex 0 0 50%
    .ni-ph-title
      justify-content flex-start
      border-bottom none

    .ni-kvs
      border-bottom none
      .ni-kv
        border-right none
</style>

