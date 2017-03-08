<template>
  <div class="pb-container">
    <div class="pb-bar-outer">
      <div class="pb-bar-inner" :style="innerBarStyle">
        <div class="label label-percentage">{{ percentageDonatedFriendly }}% funded</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import num from '../scripts/num.js'
export default {
  name: 'progress-bar',
  computed: {
    amountDonated () {
      let btcTotal = this.progress.btcRaised * this.config.COINS.BTC.USD
      let ethTotal = this.progress.ethRaised * this.config.COINS.ETH.USD
      return ethTotal + btcTotal
    },
    percentageDonated () {
      return this.amountDonated / 10000000
    },
    percentageDonatedFriendly () {
      return Math.round(this.percentageDonated * 100)
    },
    innerBarStyle () {
      return {
        width: this.percentageDonated * 100 + '%'
      }
    },
    ...mapGetters(['progress', 'config'])
  },
  data () {
    return {
      num: num
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.pb-container
  padding 0.375em 0

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
</style>
