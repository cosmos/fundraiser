<template>
  <section class="section-call-to-action">
    <div class="section-container">
      <h1>
        <img src="../assets/images/cosmos_logo_m.png" alt="Cosmos">
        Fundraising
      </h1>
      <div class="description">
        <p>Fundraising for <strong><a href="https://cosmos.network">Cosmos, Internet of Blockchains</a></strong> starts Feb 17th, 2017.</p>
      </div>
      <form-email-signup></form-email-signup>
    </div>
  </section> 
</template>

<script>
import FormEmailSignup from './FormEmailSignup'
export default {
  name: 'page-index',
  components: {
    FormEmailSignup
  },
  head: {
    title () {
      return {
        inner: 'Cosmos Fundraising',
        separator: '-',
        complement: this.$t('site.internetOfBlockchains')
      }
    }
  },
  methods: {
    goToFund () {
      console.log('going to fund page!')
      this.$router.push('/fund')
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.section-call-to-action
  .section-container
    padding 6rem 0 3rem
    text-align center
    min-height 80vh

    display flex
    flex-flow column
    justify-content center
    align-items center
    align-content center

    width 75vw
    margin 0 auto

    h1
      font-size 1.25rem
      color dim
      margin-bottom 2rem
      text-transform uppercase
      letter-spacing 0.1em
      img
        height 2rem
        display block
        margin 0 auto 0.5rem

    .description
      color txt
      margin-bottom 2rem
      border-bottom 1px dotted bc
      padding-bottom 1rem
      p
        margin-bottom 1rem

    .btn, .input
      width 100vw
      max-width 20rem
</style>
