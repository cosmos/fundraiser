<template>
  <module size="sm" class="module-balance">
    <div slot="title">Your Balance</div>
    <div class="module-balance-main">
      <key-values>
        <key-value>
          <div slot="value" :title="num.full(balance)">
            <span class="integer">{{ num.int(balance) }}</span><span class="fraction">{{ num.frac(balance.atoms) }}</span></div>
          <div slot="key">Atoms</div>
        </key-value>
      </key-values>
    </div>
    <div slot="footer">
      Get a copy of the wallet: <a href="#">Download</a>
    </div>
  </module>
</template>

<script>
import { mapGetters } from 'vuex'
import { reduce } from 'lodash'
import num from '../scripts/num.js'
import KeyValue from './KeyValue'
import KeyValues from './KeyValues'
import Module from './Module'
import Btn from '@nylira/vue-button'
export default {
  name: 'module-balance',
  components: {
    Btn,
    KeyValue,
    KeyValues,
    Module
  },
  computed: {
    balance () {
      /* let myDonations =
        this.donations.filter(t => t.userId === this.sessionUser.uid)
      */
      let myDonations = this.donations
      let total = reduce(myDonations, (acc, t) => acc + t.atoms, 0)
      return total
    },
    ...mapGetters(['donations', 'sessionUser'])
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

.module-balance-main
  display flex
  > div
    flex 1

  .download-container
    border-left 1px solid bc
    .download
      padding 1rem
      display flex
      flex-flow column
      justify-content center
      align-items center
      .label
        margin-bottom 0.5rem
        color light
      .ni-btn-wrapper
        width 100%
        max-width 10rem

@media screen and (min-width:768px)
  .module-balance-main
    .download-container
      .download
        .label
          margin-bottom 0.75rem
</style>
