<template>
  <module size="sm">
    <header>
      <div class="title">Your Balance</div>
    </header>
    <div class="components">
      <div class="component">
        <div class="value" :title="num.full(balance)">
          <span class="integer">{{ num.int(balance) }}</span><span class="fraction">{{ num.frac(balance.atoms) }}</span></div>
        <div class="unit">Atoms</div>
      </div>
    </div>
  </module>
</template>

<script>
import Module from './Module'
import { mapGetters } from 'vuex'
import num from '../scripts/num.js'
import { reduce } from 'lodash'
export default {
  components: {
    Module
  },
  computed: {
    balance () {
      if (this.transactions) {
        // let myTransactions = this.transactions.filter(t => t.userId === this.sessionUser.uid)
        let myTransactions = this.transactions
        let total = reduce(myTransactions, (acc, t) => acc + t.atoms, 0)
        return total
      }
      return 0
    },
    ...mapGetters(['transactions', 'sessionUser'])
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
</style>

