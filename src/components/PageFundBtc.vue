<template>
<div class="page page-fund">
  <vue-page-header :title="$t('siteFund.titleBtc')" type="center"></vue-page-header>
  <form class="form" v-on:submit.prevent.default="continuePayment">
    <div class="step">
      <div class="step-title">Step 1</div>
      <div class="form-group">
        <label>Enter amount to purchase in either Bitcoin or Atoms.</label>
        <div class="input-group">
          <vue-input input-placeholder="Amount" required></vue-input>
          <div class="input-group-addon">BTC</div>
        </div>
        <label>=</label>
        <div class="input-group">
          <vue-input input-placeholder="Amount" required></vue-input>
          <div class="input-group-addon">Atoms</div>
        </div>
        <div class="desc">Price: 1 BTC buys 2,000 Atoms.</div>
        <div class="desc">Minimum purchase amount is 0.01 BTC or 20.00 Atoms, maximum purchase amount is 500.00 BTC or 1,000,000 Atoms.</div>
      </div>
    </div>
    <div class="step">
      <div class="step-title">Step 2</div>
      <div class="form-group">
        <label>Enter a valid email address. Your wallet backup will be emailed to this address.</label>
        <div class="input-group">
          <vue-input
            input-type="email"
            input-placeholder="Enter your email"
            required>
          </vue-input>
        </div>
        <div class="input-group">
          <vue-input
            input-type="email"
            input-placeholder="Re-enter your email"
            required>
          </vue-input>
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step-title">Step 3</div>
      <div class="form-group">
        <label>Enter a password. This is required to encrypt and access your wallet.</label>
        <div class="input-group">
          <vue-input
            input-type="password"
            input-placeholder="Enter your password"
            required>
          </vue-input>
        </div>
        <div class="input-group">
          <vue-input
            input-type="password"
            input-placeholder="Re-enter your password"
            required>
          </vue-input>
        </div>
      </div>
    </div>
    <div class="step">
      <vue-button btn-type="submit" btn-size="large" btn-value="Continue"></vue-button>
    </div>
  </form>
</div>
</template>

<script>
import VuePageHeader from '@nylira/vue-page-header'
import VueInput from '@nylira/vue-input'
import VueButton from '@nylira/vue-button'
export default {
  name: 'page-fund',
  components: {
    VuePageHeader,
    VueInput,
    VueButton
  },
  methods: {
    continuePayment () {
      window.alert('TODO: Next Step')
    }
  },
  mounted () {
    document.title = this.$t('siteFund.titleBtc') + ' - Cosmos'
    let highlights = document.querySelectorAll('.highlight-on-focus')
    Array.from(highlights).map(function (el) {
      el.addEventListener('click', function () { this.select() })
    })
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.page-fund .pz-page-header
  border-bottom none

.form
  max-width 40rem
  margin 0 auto
  .form-group
    label
      margin-bottom 1rem
  .input-group
    margin-bottom 1rem
.step
  border-bottom 1px solid bc
  padding 0.5rem 0
  .step-title
    font-weight bold
    padding 0 1rem
</style>
