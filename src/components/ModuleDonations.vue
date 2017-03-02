<template>
  <module class="module-donations">
    <div slot="title">Donation History</div>
    <menu slot="menu">
      <a class="btn-filter active" @click="setFilter('', $event)">All</a>
      <a class="btn-filter" @click="setFilter('btc', $event)">BTC</a>
      <a class="btn-filter" @click="setFilter('eth', $event)">ETH</a>
    </menu>
    <div class="donations">
      <div class="header-transaction">
        <div class="type">Type</div>
        <div class="donated">Donated</div>
        <div class="claimed">Claimed</div>
        <div class="date">Date</div>
      </div>
      <div
        class="card-transaction"
        v-for="t in filteredDonations" 
        @click="toggleDetails">
        <div class="type">
          <img v-if="t.type === 'btc'" src="../assets/images/logo-bitcoin-320.png">
          <img v-else src="../assets/images/logo-ethereum-320.png">
        </div>
        <div class="donated">
          <span class="value">{{ flexibleNumber(t.atoms / t.price) }}</span>
          <span class="key">{{ t.type.toUpperCase() }}</span>
        </div>
        <div class="claimed">
          <span class="value">{{ flexibleNumber(t.atoms) }}</span>
          <span class="key">Atoms</span>
        </div>
        <div class="date" :title="isoDate(t.time)">
          <span class="value">{{ flexibleDate(t.time) }}</span>
          <span class="key">{{ date(t.time) }}</span>
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
  name: 'module-donations',
  components: {
    Module
  },
  computed: {
    myDonations () {
      if (this.donations.length > 0) {
        let userId = this.sessionUser.uid
        return this.donations.filter(t => t.userId === userId)
      }
      return []
    },
    orderedDonations () {
      return orderBy(this.donations, ['time'], ['desc'])
    },
    filteredDonations () {
      if (this.filter) {
        return this.orderedDonations.filter(t => t.type === this.filter)
      }
      return this.orderedDonations
    },
    ...mapGetters(['donations', 'sessionUser'])
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
    date (time) {
      return moment(time).format('YYYY-MM-DD')
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

.module-donations
  .donations
    max-width 1024px
    font-size 0.75rem

  .header-transaction
  .card-transaction
    padding 0 .5rem
    display flex
    align-items center

    border-bottom 1px solid bc

    div
      padding 0.5rem

    .type
      flex 1
      display none
      img
        width 1rem

    .donated, .claimed
      flex 2
      white-space nowrap
      text-overflow ellipsis
      overflow hidden


    .value, .key
      font-size 0.75rem
      display block

    .value
      font-weight 400

    .key
      color light

    .date
      flex 2

  .header-transaction
    background bc

  .card-transaction
    &:last-of-type
      border-bottom none

@media screen and (min-width:360px)
  .module-donations
    .card-transaction
      .value
        font-size 0.875rem

@media screen and (min-width:414px)
  .module-donations
    .card-transaction
      .value
        font-size 1rem

@media screen and (min-width:768px)
  .module-donations

    .header-transaction
    .card-transaction
      .type
        display block
</style>
