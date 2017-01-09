<template>
  <section class="section-call-to-action">
    <div class="section-container">
      <h2>{{ $t('sectionCallToAction.title') }}</h2>
      <div class="description">
        <p>{{ $t('sectionCallToAction.description') }}</p>
      </div>
      <a class="btn btn-default">Fund Cosmos</a>
    </div>
  </section> 
</template>

<script>
export default {
  name: 'section-call-to-action'
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.section-call-to-action
  background c-app-fg
  background #000
  height 100vh

  .section-container
    max-width 25rem
    margin 0 auto

    text-align center
    padding 2rem

    h2
      font-size 1.5rem
      margin-bottom 0.5rem
      letter-spacing 0.01em

    .description
      margin-bottom 1.5rem
      color light
</style>
