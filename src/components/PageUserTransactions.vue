<template>
<div class="page-user-transactions">
  <vue-page-header
    title="Transactions"
    subtitle="This is your fundraise history."
    type="center">
  </vue-page-header>
  <div class="transactions">
    <header class="header-transaction">
      <div class="type">Type</div>
      <div class="paid">Paid</div>
      <div class="received">Received</div>
      <div class="date">Date</div>
    </header>
    <div class="card-transaction" v-for="t in orderedTransactions">
      <div :class="'type type-' + t.type">{{ t.type }}</div>
      <div class="paid">{{ t.price }} <span class="unit">{{ t.type }}</span></div>
      <div class="received">{{ t.atoms }} <span class="unit">atoms</span></div>
      <div class="date" @click="swapDateFormat" :title="isoDate(t.time)">
        {{ flexibleDate(t.time) }}
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { orderBy } from 'lodash'
import moment from 'moment'
import { mapGetters } from 'vuex'
import VuePageHeader from '@nylira/vue-page-header'
import VueButton from '@nylira/vue-button'
import VueInput from '@nylira/vue-input'
import FormMsg from './FormMsg'
import firebase from 'firebase'
export default {
  name: 'page-user-settings',
  components: {
    VuePageHeader,
    VueButton,
    VueInput,
    FormMsg
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
  },
  beforeMount () {
    let self = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        self.$store.commit('setSessionRequest', self.$route.path)
        self.$router.replace('/signup')
        self.$store.commit('notifyAuthRequired')
      }
    })
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.transactions
  max-width 960px
  margin 0 auto
  font-size 0.75rem

.header-transaction
.card-transaction
  padding 0 .5rem
  background c-app-fg
  border-bottom 1px solid bc

  display flex
  align-items center

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
  .type
    text-transform uppercase
    font-weight bold

  .paid, .received
    font-size 1.125rem

@media screen and (min-width:400px)
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
