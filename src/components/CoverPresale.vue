<template>
  <div class="cover-presale">
    <h1 class="title">
      Fundraising for <a href="https://cosmos.network">Cosmos, Internet of Blockchains</a> starts on February 28, 2017.
    </h1>
    <vue-countdown date="February 28, 2017"></vue-countdown>
    <form-email-signup></form-email-signup>
    <a class="dev-button" @click="startSales">DEV: start sales -></a>
  </div> 
</template>

<script>
import FormEmailSignup from './FormEmailSignup'
import VueCountdown from '@nylira/vue-countdown'
export default {
  name: 'page-index',
  components: {
    FormEmailSignup,
    VueCountdown
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
    startSales () {
      this.$store.commit('setSaleBegun', true)
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.cover-presale
  width 80vw
  max-width 30rem
  height 85vh
  min-height 45vw
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

.dev-button
  background txt
  display inline-block
  border 1px solid txt
  line-height 2rem
  padding 0 1rem
  color c-app-fg
  margin-top 1.5rem
  &:hover
    cursor pointer

@media screen and (min-width: 360px)
  .cover-presale
    height 80vh
    .title
      font-size 1.375rem

    .title, .pz-countdown
      margin-bottom 2.5rem

@media screen and (min-width: 400px)
  .cover-presale
    .title
      font-size 1.5rem

    .title, .pz-countdown
      margin-bottom 3rem
</style>
