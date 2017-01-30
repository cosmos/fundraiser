<template>
  <div class="cover-sale">
    <section>
      <h1>Cosmos Fundraising</h1>
    </section>
    <section>
      <div class="key">Atom Sale Ends In</div>
      <vue-countdown date="April 28, 2017"></vue-countdown>
    </section>
    <section>
      <div class="key">Atoms Purchased</div>
      <div class="value">~195,300</div>
    </section>
    <section>
      <div class="key">Current Price</div>
      <div class="value">$1 USD = 2.222 atoms</div>
    </section>
    <section>
      <div class="buttons">
        <vue-button
          @click.native="gotoBtc"
          class="btn-bitcoin"
          btn-value="Buy with BTC"
          btn-size="large">
        </vue-button>
        <vue-button
          @click.native="gotoEth"
          class="btn-ether"
          btn-value="Buy with ETH"
          btn-size="large">
        </vue-button>
      </div>
      <sale-warning></sale-warning>
    </section>
  </div> 
</template>

<script>
import VueCountdown from '@nylira/vue-countdown'
import VueButton from '@nylira/vue-button'
import SaleWarning from './SaleWarning'
export default {
  name: 'page-index',
  components: {
    VueCountdown,
    VueButton,
    SaleWarning
  },
  head: {
    title () {
      return {
        inner: 'Cosmos Fundraising',
        separator: '-',
        complement: this.$t('site.internetOfBlockchains')
      }
    }
  },
  methods: {
    gotoBtc () {
      this.$router.push('/btc')
    },
    gotoEth () {
      this.$router.push('/eth')
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.cover-sale
  section
    padding 1.5rem 1rem
    border-bottom 1px dotted bc
    text-align center
    &:last-of-type
      border-bottom none

    h1
      font-size 2rem
      line-height 1.05
      font-weight 300
      text-align center

    .key
      font-size 1.5rem
      color txt
      font-weight 400
      margin-bottom 0.75rem

    .pz-countdown
      width 75vw
      margin 0 auto
      max-width 20rem

    .value
      font-size 1.25rem
      font-weight 400

    .buttons
      .pz-button
        width 16rem
        margin 0 auto
        margin-bottom 1rem
        font-weight 600
        &.btn-bitcoin
          background #f90
          color c-app-fg
          border-color darken(#f90, 25%)
        &.btn-ether
          background #ECF0F1
          border-color darken(#ECF0F1, 25%)
          color #3C3C3D
</style>
