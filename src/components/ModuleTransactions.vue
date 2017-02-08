<template>
  <module class="module-transactions">
    <header>
      <div class="title">Transaction History</div>
    </header>
    <div class="body transactions">
      <header class="header-transaction">
        <div class="type">Type</div>
        <div class="paid">Paid</div>
        <div class="received">Received</div>
        <div class="date">Date</div>
      </header>
      <div class="card-transaction" v-for="t in orderedTransactions">
        <div :class="'type type-' + t.type">{{ t.type }}</div>
        <div class="paid">{{ t.price }} <span class="unit">{{ t.type }}</span></div>
        <div class="received">{{ t.coins }} <span class="unit">CAT</span></div>
        <div class="date" @click="swapDateFormat" :title="isoDate(t.time)">
          {{ flexibleDate(t.time) }}
        </div>
      </div>
    </div>
    <footer>
      <a class="active" href="#">All</a>
      <a href="#">BTC</a>
      <a href="#">ETH</a>
    </footer>
  </module>
</template>

<script>
import { mapGetters } from 'vuex'
import { orderBy } from 'lodash'
import moment from 'moment'
import FormMsg from './FormMsg'
import Module from './Module'
export default {
  name: 'module-transactions',
  components: {
    FormMsg,
    Module
  },
  computed: {
    orderedTransactions () {
      return orderBy(this.transactions, ['time'], ['desc'])
    },
    ...mapGetters(['transactions'])
  },
  data () {
    return {
      timeAgo: true
    }
  },
  methods: {
    fromNow (time) {
      return moment(time).fromNow()
    },
    isoDate (time) {
      return moment(time).format('YYYY-MM-DD hh:MM:SS A')
    },
    flexibleDate (time) {
      if (this.timeAgo) return this.fromNow(time)
      return this.isoDate(time)
    },
    swapDateFormat () {
      this.timeAgo = !this.timeAgo
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
      padding 0.5rem 0.5rem

    .type
      flex 1
      display none

    .paid, .received
      flex 2
      text-align right

    .date
      flex 2
      text-align right

    .unit
      display block
      color light
      text-transform uppercase
      font-size 0.6rem

  .header-transaction
    div
      font-weight bold

  .card-transaction
    &:last-of-type
      border-bottom none
    .type
      text-transform uppercase
      font-weight bold

    .paid, .received
      font-size 1.125rem

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
</style>
