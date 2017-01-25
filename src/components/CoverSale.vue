<template>
  <div class="cover-sale">
    <section>
      <h1>Cosmos Fundraising</h1>
    </section>
    <section>
      <div class="key">Atom Sale Ends In</div>
      <div class="section-value">
        <vue-countdown date="April 28, 2017"></vue-countdown>
      </div>
    </section>
    <section>
      <div class="key">Atoms Purchased</div>
      <div class="value">~195,300</div>
    </section>
    <section>
      <div class="key">Current Price</div>
      <div class="value">$1 USD = 45 atoms</div>
    </section>
    <section>
      <vue-button
        btn-value="Buy Atoms"
        btn-size="large">
      <vue-button>
    </section>
  </div> 
</template>

<script>
import VueCountdown from '@nylira/vue-countdown'
import VueButton from '@nylira/vue-button'
export default {
  name: 'page-index',
  components: {
    VueCountdown,
    VueButton
  },
  head: {
    title () {
      return {
        inner: 'Cosmos Fundraising',
        separator: '-',
        complement: this.$t('site.internetOfBlockchains')
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.cover-sale
  section
    padding 1.5rem 1rem
    border-bottom 1px dotted bc
    text-align center
    &:last-of-type
      border-bottom none

    h1
      font-size 2rem
      line-height 1.05
      font-weight 600
      text-align center

    .key
      font-size 1.25rem
      color light
      margin-bottom 0.75rem

    .value
      font-size 1.25rem
      font-weight 600
      span
        font-weight 300

    .pz-button
      margin 0 auto
</style>
