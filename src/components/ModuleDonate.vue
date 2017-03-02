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
        <div class="exchange-rate">
          <span class="value">1 {{ coin.UNIT }}</span>
          :
          <span class="value">{{ exchangeRate }} Atoms</span>
        </div>
        <btn
          :value="'Donate ' + coin.UNIT"
          @click.native="go('/' + coin.UNIT)"
          icon="angle-right"
          icon-pos="right"
          >
        </btn>
        <div class="min-donation">
          Minimum Donation: {{ coin.MIN_DONATION }} {{ coin.UNIT }}
        </div>
      </div>
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
    padding 1rem

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
      margin-bottom 0.5rem
      .value
        font-weight 500
        color mcolor

    .min-donation
      font-size 0.75rem
      color light

    .ni-btn-wrapper
      max-width 12rem
      margin-bottom 0.5rem

@media screen and (min-width:768px)
  .module-donation
    .body
      padding 1.5rem
    .text
      padding-left 2rem
</style>
