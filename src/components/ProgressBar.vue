<template>
  <div class="pb-container">
    <div class="pb-bar-outer">
      <div class="pb-bar-obscured" v-if="!capped">
        fundraiser cap is hidden<span class="first-six-hours">for the first six hours</span>
      </div>
      <div class="pb-bar-inner" :style="innerBarStyle" v-else>
        <div class="label label-percentage">{{ percentageDonatedFriendly }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import num from '../scripts/num.js'
export default {
  name: 'progress-bar',
  computed: {
    capped () {
      let utcStart = moment.utc(this.config.START_DATETIME)
      let localStart = moment(utcStart).local()
      let endHiddenCapStr = (localStart).add(this.config.CAP_START, 'hours')._d
      let endHiddenCap = Math.floor(new Date(endHiddenCapStr).getTime() / 1000)
      return endHiddenCap < this.now
    },
    percentageDonated () {
      return this.atomsClaimed / this.config.CAP_AMOUNT
    },
    percentageDonatedFriendly () {
      return Math.round(this.percentageDonated * 100 * 100) / 100
    },
    innerBarStyle () {
      return {
        width: this.percentageDonated * 100 + '%'
      }
    },
    ...mapGetters([ 'progress', 'config', 'atomsClaimed' ])
  },
  data () {
    return {
      num: num,
      now: Math.floor(Date.now() / 1000)
    }
  },
  mounted () {
    setInterval(() => {
      this.now = Math.floor(Date.now() / 1000)
    }, 1000)
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.pb-container
  padding 0.375em 0

  .pb-bar-obscured
    text-align center
    text-transform uppercase
    font-size 0.75rem
    width 100%
    display flex
    align-items center
    justify-content center
    background hsl(mhue,15%,85%)
    color txt
    font-weight 400

  .pb-bar-outer
    height 1.5rem
    display flex
    background hsl(mhue,15%,85%)

  .pb-bar-inner
    background mcolor

    display flex
    justify-content flex-end
    align-items center

    .label
      font-size 0.75rem
      color alpha(c-app-fg,85%)
      padding 0 0.375rem

  .description
    color light
    text-align center
    font-size 0.75rem
    font-weight 400
    margin-top 0.5rem

.first-six-hours
  display none
  margin-left 0.25em

@media screen and (min-width: 768px)
  .first-six-hours
    display inline
</style>
