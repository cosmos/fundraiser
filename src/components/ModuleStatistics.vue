<template>
  <module class="module-statistics">
    <div slot="title">Fundraiser Stats</div>
    <div class="pb-label" slot="menu">{{ pbLabel }}</div>
    <progress-bar></progress-bar>
    <key-values>
      <key-value>
        <div slot="value">
          <span class="integer">{{ num.int(atoms) }} ATOM</span>
        </div>
        <div slot="key">{{ capAmount }}</div>
      </key-value>
      <key-value>
        <div slot="value">
          <span class="integer">{{ num.int(txCount) }}<span>
        </div>
        <div slot="key">donations</div>
      </key-value>
      <key-value>
        <div slot="value" :title="num.full(btc)">
          <span class="integer">{{ num.short(btc) }}</span></div>
        <div slot="key">BTC raised</div>
      </key-value>
      <key-value>
        <div slot="value" :title="num.full(eth)">
          <span class="integer">{{ num.short(eth) }}</span></div>
        <div slot="key">ETH raised</div>
      </key-value>
    </key-values>
  </module>
</template>

<script>
import { mapGetters } from 'vuex'
import num from '../scripts/num.js'
import KeyValues from './KeyValues'
import KeyValue from './KeyValue'
import Module from './Module'
import ProgressBar from './ProgressBar'
export default {
  name: 'module-statistics',
  components: {
    KeyValue,
    KeyValues,
    Module,
    ProgressBar
  },
  computed: {
    capped () {
      return this.config.CAP_AMOUNT <= 0
    },
    pbLabel () {
      if (this.capped) {
        return `${num.short(this.atoms)} ATOM / hidden cap`
      } else {
        return `${this.percentageDonatedFriendly}% of cap reached`
      }
    },
    capAmount () {
      let cap = this.config.CAP_AMOUNT
      if (cap > 0) {
        return `of ${cap} ATOM goal`
      } else {
        return `of hidden cap`
      }
    },
    percentageDonated () {
      return this.atomsClaimed / this.config.CAP_AMOUNT
    },
    percentageDonatedFriendly () {
      return Math.round(this.percentageDonated * 100 * 100) / 100
    },
    btc () {
      return this.progress.btcRaised
    },
    eth () {
      return this.progress.ethRaised
    },
    atoms () {
      return num.pretty(this.atomsClaimed)
    },
    ...mapGetters(['progress', 'config', 'txCount', 'atomsClaimed'])
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

.module-statistics
  .ni-module-footer
    display none

  .pb-container
    border-bottom 1px solid bc

  .ni-kvs
    flex-flow row wrap
    padding 0

  .ni-kv
    flex 0 0 50% !important
    border-right 1px solid bc
    border-bottom 1px solid bc
    &:nth-child(2)
      border-right none
    &:nth-child(3)
      border-bottom none
    &:nth-child(4)
      border-right none
      border-bottom none
  .pb-label
    padding 0 0.25rem
    color light
    font-size 0.875rem

@media screen and (min-width: 768px)
  .module-statistics
    .ni-kvs
      flex-flow row wrap
      padding 0
    .ni-kv
      flex 0 0 25% !important
      border-bottom none
      &:nth-child(2)
        border-right 1px solid bc
</style>
