<template>
  <footer class="app-footer">
    <div class="container">
      <div class="copyright">&copy; 2017 Interchain Foundation</div>
      <div class="about"><a href="http://slack.cosmos.network">Need help?</a></div>
  </footer>
</template>

<script>
export default {
  name: 'app-footer'
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.app-footer
  border-top 1px solid bc
  flex 0 0 3rem
  font-size 0.75rem

  .container
    max-width 1024px
    margin 0 auto

    height 3rem

    display flex
    justify-content space-between
    align-items center

    > div
      padding 0 1rem
      color light
      line-height 1.5rem

@media screen and (max-width:360px)
  .app-footer
    font-size 0.875rem

@media screen and (max-width:4141px)
  .app-footer
    font-size 1rem
</style>
