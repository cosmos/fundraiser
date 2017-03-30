<template>
  <module class="module-donations">
    <module-overlay slot="overlay" v-if="!fundraiserActive"></module-overlay>
    <div slot="title">Donation History</div>
    <menu slot="menu">
      <a class="btn-filter active" @click="setFilter('', $event)">All</a>
      <a class="btn-filter" @click="setFilter('btc', $event)">BTC</a>
      <a class="btn-filter" @click="setFilter('eth', $event)">ETH</a>
    </menu>
    <div class="donations">
      <div class="header-transaction">
        <div class="donated">Donated</div>
        <div class="claimed">Claimed</div>
        <div class="date">Date</div>
      </div>
      <div
        class="card-transaction"
        v-for="t in filteredDonations"
        @click="toggleDetails">
        <div class="donated">
          <span class="value">{{ flexibleNumber(t.donated) }}</span>
          <span class="key">{{ t.type.toUpperCase() }}</span>
        </div>
        <div class="claimed">
          <span class="value">{{ flexibleNumber(t.claimed) }}</span>
          <span class="key">ATOM</span>
        </div>
        <div class="date" :title="isoDate(t.time)">
          <span class="value">{{ flexibleDate(t.time) }}</span>
          <span class="key">{{ fromNow(t.time) }}</span>
        </div>
      </div>
    </div>
  </module>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import hasFundraiseStarted from '../scripts/hasFundraiseStarted'
import num from '../scripts/num.js'
import Module from './Module'
import ModuleOverlay from './ModuleOverlay'
export default {
  name: 'module-donations',
  components: {
    Module,
    ModuleOverlay
  },
  computed: {
    filteredDonations () {
      if (this.filter) {
        return this.donations.filter(t => t.type === this.filter)
      } else {
        return this.donations
      }
    },
    fundraiserActive () {
      console.log('started/ended', this.fundraiserStarted, this.fundraiserEnded)
      return this.fundraiserStarted && !this.fundraiserEnded
    },
    ...mapGetters(['config', 'donations', 'fundraiserEnded'])
  },
  data () {
    return {
      hasFundraiseStarted,
      fundraiserStarted: false,
      details: true,
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
      return moment(time).format('YYYY-MM-DD hh:mm:ss A')
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
    },
    watchFundraiserStart () {
      let start = this.config.START_DATETIME
      this.fundraiserStarted = hasFundraiseStarted(start)
    }
  },
  mounted () {
    this.watchFundraiserStart()
    setInterval(() => this.watchFundraiserStart(), 1000)
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.module-donations
  .donations
    max-width 1024px
    font-size 0.75rem
    font-weight 400

  .header-transaction
  .card-transaction
    padding 0 .5rem
    display flex
    align-items center

    border-bottom 1px solid bc

    div
      padding 0.5rem

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

    .donated .value
      color hsl(0,100%,40%)

    .claimed .value
      color hsl(mhue,msat,40%)

  .header-transaction
    background c-app-bg
    height 2rem
    display flex
    div
      padding 0 0.5rem

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
</style>
