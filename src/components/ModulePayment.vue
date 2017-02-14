<template>
  <module class="module-payment">
    <header>
      <div class="title">Pay with {{ coin.name }}</div>
    </header>
    <div class="body">
      <div class="img">
        <img v-if="coin.name === 'Ethereum'" src="../assets/images/logo-ethereum-320.png">
        <img v-else src="../assets/images/logo-bitcoin-320.png">
      </div>
      <div class="text">
        <div class="label">
          <p>1 {{ coin.unit }} = {{ coin.exchangeRate }} CAT</p>
          <p class="desc">Minimum Payment: {{ coin.minimumPayment }} {{ coin.unit }}</p>
        </div>
        <btn
          :value="'Pay with ' + coin.unit"
          @click.native="go('/' + coin.unit)"
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
export default {
  components: {
    Btn,
    Module
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
    max-width 10rem
    margin-right 0.5rem

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
    padding 0.5rem
    padding-left 0
    min-width 0

    display flex
    flex-flow column

    .label
      flex 1
      margin-bottom 0.5rem
      p
        font-size 1.25rem
        color mcolor
        &.desc
          font-size 0.75rem
          color light
          margin 0

    .ni-btn
      max-width 10rem

@media screen and (min-width:720px)
  .module.module-payment
    .text
      .label
        p
          font-size 1.5rem
        &.desc
          font-size 1rem

@media screen and (min-width:960px)
  .module.module-payment
    flex 0 0 50%
</style>
