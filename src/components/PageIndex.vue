<template>
  <div class="page-index">
    <div class="container">
      <h1 class="title">
        Fundraising for <a href="https://cosmos.network">Cosmos, Internet of Blockchains</a> starts on February 22, 2017.
      </h1>
      <pz-countdown date="February 22, 2017"></pz-countdown>
      <form-email-signup></form-email-signup>
    </div> 
  </div> 
</template>

<script>
import FormEmailSignup from './FormEmailSignup'
import PzCountdown from './PzCountdown'
export default {
  name: 'page-index',
  components: {
    FormEmailSignup,
    PzCountdown
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

.page-index
  border-bottom 0.25rem solid c-app-fg

  .container
    width 80vw
    max-width 30rem
    height 85vh
    margin 0 auto
    padding-top 4.5rem

    display flex
    flex-flow column
    justify-content center
    align-items center

    .title, .pz-countdown
      margin-bottom 2rem

    .title
      font-size 1.25rem
      line-height 1.75
      text-align center
      a
        color txt
        font-weight 600
        &:hover
          color link
 
@media screen and (min-width: 360px)
  .page-index .container
    height 80vh
    .title
      font-size 1.375rem

    .title, .pz-countdown
      margin-bottom 2.5rem

@media screen and (min-width: 400px)
  .page-index .container
    .title
      font-size 1.5rem

    .title, .pz-countdown
      margin-bottom 3rem
</style>
