<template>
  <module size="sm" class="module-balance">
    <div slot="title">Your Balance</div>
    <key-values>
      <key-value>
        <div slot="value" :title="num.full(balance)">
          <span class="integer">{{ num.int(balance) }}</span><span class="fraction">{{ num.frac(balance.atoms) }}</span></div>
        <div slot="key">Atoms</div>
      </key-value>
    </key-values>
  </module>
</template>

<script>
import { mapGetters } from 'vuex'
import { reduce } from 'lodash'
import num from '../scripts/num.js'
import KeyValue from './KeyValue'
import KeyValues from './KeyValues'
import Module from './Module'
export default {
  name: 'module-balance',
  components: {
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
