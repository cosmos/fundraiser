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
          <span class="value">1 {{ coin.UNIT }}</span>
          :
          <span class="value">{{ exchangeRate }} ATM</span>
        </div>
        <btn
          :value="'Pay with ' + coin.UNIT"
          @click.native="go('/' + coin.UNIT)"
          icon="angle-right"
          icon-pos="right"
          >
        </btn>
        <div class="min-payment">
          Min Payment: {{ coin.MIN_PAYMENT }} {{ coin.UNIT }}
        </div>
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
      return num.int(this.coin.EXCHANGE_RATE)
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
    flex 0 0 25%
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
      margin-bottom 0.75rem
      line-height 1
      .value
        font-weight 500
        color mcolor

    .min-payment
      font-size 0.75rem
      color light

    .ni-btn-wrapper
      max-width 10rem
      margin-bottom 0.5rem

@media screen and (min-width:720px)
  .module.module-payment
    flex 0 0 50%
    .text
      .exchange-rate
        font-size 1.5rem
        .value
          font-weight 400
</style>
