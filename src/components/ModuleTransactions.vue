<template>
  <module class="module-transactions">
    <header>
      <div class="title">Transaction History</div>
      <menu>
        <a class="btn-filter active" @click="setFilter('', $event)">All</a>
        <a class="btn-filter" @click="setFilter('btc', $event)">BTC</a>
        <a class="btn-filter" @click="setFilter('eth', $event)">ETH</a>
      </menu>
    </header>
    <div class="transactions">
      <header class="header-transaction">
        <div class="type">Type</div>
        <div class="paid">Paid</div>
        <div class="received">Received</div>
        <div class="date">Date</div>
      </header>
      <div
        class="card-transaction"
        v-for="t in transactions" 
        @click="toggleDetails">
        <div :class="'type type-' + t.type">{{ t.type }}</div>
        <div class="paid">
          {{ flexibleNumber(t.atoms / t.price) }}
          <span class="unit">{{ t.type }}</span>
        </div>
        <div class="received">
          {{ flexibleNumber(t.atoms) }}
          <span class="unit">atoms</span>
        </div>
        <div class="date" :title="isoDate(t.time)">
          {{ flexibleDate(t.time) }}
        </div>
      </div>
    </div>
  </module>
</template>

<script>
import { mapGetters } from 'vuex'
import { orderBy } from 'lodash'
import moment from 'moment'
import Module from './Module'
import num from '../scripts/num.js'
export default {
  name: 'module-transactions',
  components: {
    Module
  },
  computed: {
    myTransactions () {
      if (this.transactions.length > 0) {
        let userId = this.sessionUser.uid
        return this.transactions.filter(t => t.userId === userId)
      }
      return []
    },
    orderedTransactions () {
      return orderBy(this.myTransactions, ['time'], ['desc'])
    },
    filteredTransactions () {
      if (this.filter) {
        return this.orderedTransactions.filter(t => t.type === this.filter)
      }
      return this.orderedTransactions
    },
    ...mapGetters(['transactions', 'sessionUser'])
  },
  data () {
    return {
      details: false,
      filter: ''
    }
  },
  methods: {
    setFilter (value, event) {
      let btns = document.querySelectorAll('.btn-filter')
      Array.from(btns).forEach(btn => btn.classList.remove('active'))
      event.target.classList.add('active')
      this.filter = value
    },
    fromNow (time) {
      return moment(time).fromNow()
    },
    isoDate (time) {
      return moment(time).format('YYYY-MM-DD hh:MM:SS A')
    },
    flexibleNumber (value) {
      if (this.details) return num.full(value)
      return num.pretty(value)
    },
    flexibleDate (time) {
      if (this.details) return this.isoDate(time)
      return this.fromNow(time)
    },
    toggleDetails () {
      this.details = !this.details
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.module-transactions
  .transactions
    max-width 960px
    margin 0 auto
    font-size 0.75rem

  .header-transaction
  .card-transaction
    padding 0 .5rem
    display flex
    align-items center

    border-bottom 1px dotted bc

    div
      padding 0.5rem

    .type
      flex 1
      display none

    .paid, .received
      flex 2
      text-align right
      white-space nowrap
      text-overflow ellipsis
      overflow hidden

      font-size 0.75rem

    .date
      flex 2
      text-align right

    .unit
      display block
      color light

  .header-transaction
    div
      font-weight bold

  .card-transaction
    &:last-of-type
      border-bottom none
    .type
      text-transform uppercase
      font-weight bold

@media screen and (min-width:400px)
  .module-transactions
    .header-transaction
    .card-transaction
      .type
        display block

    .card-transaction
      .paid, .received
        font-size 1.25rem
      .unit
        font-size 0.75rem

@media screen and (min-width:720px)
  .module-transactions
    .card-transaction
      .paid, .received
        display flex
        align-items center
        justify-content flex-end
      .unit
        margin-left 0.5rem
      .paid, .received
        flex 4
      .date
        flex 3
</style>
