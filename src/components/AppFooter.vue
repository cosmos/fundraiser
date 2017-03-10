<template>
  <footer class="app-footer">
    <div class="container">
      <div class="copyright">&copy; 2016 Cosmos Network Foundation</div>
      <div class="about"><a href="https://cosmos.network">What is Cosmos?</a></div>
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
  height 3rem

  .container
    max-width 1024px
    margin 0 auto

    display flex
    justify-content space-between

    > div
      padding 0 1rem
      color light
      line-height 2.25rem
</style>
