<template>
  <section class="section-call-to-action">
    <div class="section-container">
      <h1>{{ $t('sectionCallToAction.title') }}</h1>
      <div class="description">
        <p>{{ $t('sectionCallToAction.description') }}</p>
      </div>
    </div>
    <btn @click="goToFund">Fund Cosmos</btn>
  </section> 
</template>

<script>
import Btn from './Btn'
export default {
  name: 'page-index',
  components: {
    Btn
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
      this.$router.push('/fund')
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.section-call-to-action
  background c-app-fg
  background hsl(0,0,10%)
  height 100vh
  padding-top 3rem

  display flex
  justify-content center
  align-items center
  flex-flow column

  .section-container
    text-align center
    width 80vw
    height 80vw
    border 2px solid hsl(0,0,30%)
    border-radius 40vw

    display flex
    flex-flow column nowrap
    align-items center
    justify-content center

    padding 0 1rem
    margin-bottom 3rem

    h1
      font-size 1.5rem
      margin-bottom 0.5rem
      line-height 1.25

      color #fff

    .description
      color light
      color hsl(0,0,50%)
</style>
