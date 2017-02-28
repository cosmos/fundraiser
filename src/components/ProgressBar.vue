<template>
  <div class="pb-container">
    <div class="pb-bar-outer">
      <div class="pb-bar-inner" :style="innerBarStyle">
        <span class="label label-amount">${{ num.short(amountPaid) }} / $10M</span>
        <span class="label label-percentage">{{ percentagePaidFriendly }}%</span>
      </div>
    </div>
    <div class="description">${{ num.short(amountPaid) }} / $10M</label>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import num from '../scripts/num.js'
export default {
  name: 'progress-bar',
  computed: {
    amountPaid () {
      let btcToUsd = this.progress.btcRaised * 1200
      let ethToUsd = this.progress.ethRaised * 13
      return btcToUsd + ethToUsd
    },
    percentagePaid () {
      return this.amountPaid / 10000000
    },
    percentagePaidFriendly () {
      return Math.round(this.percentagePaid * 10000) / 100
    },
    innerBarStyle () {
      return {
        width: this.percentagePaid * 100 + '%'
      }
    },
    ...mapGetters(['progress', 'config'])
  },
  data () {
    return {
      num: num
    }
  },
  mounted () {
    console.log(this.amountPaid)
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.pb-container
  padding 1em

  .pb-bar-outer
    height 3rem
    display flex
    padding 0.125rem
    background mcolor

  .pb-bar-inner
    background link

    display flex
    justify-content flex-end
    align-items center

    .label
      padding 0 0.5em
      font-size 1.5rem
      font-weight 400
      color mcolor
      &.label-amount
        font-size 1rem
        font-weight 600
        display none

  .description
    color light
    text-align center
    font-size 0.75rem
    font-weight 400
    margin-top 0.5rem

@media screen and (min-width: 768px)
  .pb-container
    .pb-bar-inner
      justify-content space-between

      .label
        padding 0 0.75rem
        &.label-amount
          display block

    .description
      display none
</style>
