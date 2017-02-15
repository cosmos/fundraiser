<template>
  <module class="module-payment">
    <header>
      <div class="title">Pay with {{ coin.NAME }}</div>
    </header>
    <div class="body">
      <div class="img">
        <img v-if="coin.NAME === 'Ethereum'"
          src="../assets/images/logo-ethereum-320.png">
        <img v-else src="../assets/images/logo-bitcoin-320.png">
      </div>
      <div class="text">
        <div class="exchange-rate">
          <span class="value">1.0 {{ coin.UNIT }}</span>
          =
          <span class="value">{{ exchangeRate }} atoms</span>
        </div>
        <div class="minimum-payment">
          Minimum Payment: {{ coin.MIN_PAYMENT }} {{ coin.UNIT }}
        </div>
        <btn
          :value="'Pay with ' + coin.UNIT"
          @click.native="go('/' + coin.UNIT)"
          icon="angle-right"
          icon-pos="right"
          >
        </btn>
      </div>
    </div>
    <!--
    <footer>
      <a href="#"><i class="fa fa-history"></i> Transaction History</a>
    </footer>
    -->
  </module>
</template>

<script>
import Module from './Module'
import Btn from '@nylira/vue-button'
import num from '../scripts/num.js'
export default {
  components: {
    Btn,
    Module
  },
  computed: {
    exchangeRate () {
      return num.pretty(this.coin.EXCHANGE_RATE)
    }
  },
  methods: {
    go (route) {
      this.$router.push(route)
    }
  },
  props: ['coin']
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.module.module-payment
  .body
    display flex

  .img
    flex 0 0 33.333%
    max-width 8rem

    display flex
    align-items center
    justify-content center
    img
      width 66.66%
      display block

    .placeholder
      flex 1
      display flex
      align-items center
      justify-content center

      font-size 1.5rem
      background bc
      color light

  .text
    flex 0 0 66.667%
    min-width 0
    padding-left 1rem

    display flex
    flex-flow column

    .exchange-rate
      color light
      font-size 1.25rem
      line-height 1
      margin-bottom 0.5rem
      .value
        font-weight 400
        color mcolor

    .minimum-payment
      font-size 0.75rem
      color light
      margin-bottom 0.5rem
    .ni-btn-wrapper
      max-width 10rem

@media screen and (min-width:720px)
  .module.module-payment
    .body
      padding 2rem 0
    .text
      .exchange-rate
        font-size 1.5rem
      .minimum-payment
        font-size 1rem
        margin-bottom 1rem

@media screen and (min-width:960px)
  .module.module-payment
    flex 0 0 50%
</style>
