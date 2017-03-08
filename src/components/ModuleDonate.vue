<template>
  <module size="sm" class="module-donation">
    <div slot="title">Donate {{ coin.NAME }}</div>
    <div class="body">
      <div class="img">
        <img v-if="coin.NAME === 'Ethereum'"
          src="../assets/images/logo-ethereum-320.png">
        <img v-else src="../assets/images/logo-bitcoin-320.png">
      </div>
      <div class="text">
        <btn
          :value="'Donate ' + coin.UNIT"
          @click.native="go('/' + coin.UNIT.toLowerCase())"
          icon="angle-right"
          icon-pos="right"
          size="lg"
          >
        </btn>
        <div class="exchange-rate">
          <span class="key">1 {{ coin.UNIT }}</span>
          <span class="symbol">:</span>
          <span class="value">{{ exchangeRate }} Atoms</span>
        </div>
      </div>
    </div>
    <div slot="footer">
      minimum donation: {{ coin.MIN_DONATION }} {{ coin.UNIT }}
    </div>
  </module>
</template>

<script>
import num from '../scripts/num.js'
import Btn from '@nylira/vue-button'
import Module from './Module'
export default {
  name: 'module-donate',
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

.module-donation
  .body
    display flex
    align-items center
    justify-content center
    padding 1rem

  .img
    display flex
    align-items center
    justify-content center
    max-width 6rem

    img
      width 3rem
      display block

  .text
    display flex
    flex-flow column
    justify-content center
    margin-left 1.5rem

    .exchange-rate
      border 1px solid bc
      border-top none
      background c-app-bg
      height 1.5rem

      display flex
      align-items center
      justify-content center

      font-size 0.75rem
      font-weight 400
      > span
        margin-right 0.25rem
        color light

    .min-donation
      font-size 0.75rem
      color light

    .ni-btn-wrapper
      width 12rem
@media screen and (min-width:768px)
  .module-donation
    .body
      padding 1.5rem

    .img img
      width 4rem
</style>
