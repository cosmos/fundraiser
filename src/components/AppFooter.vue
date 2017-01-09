<template>
  <footer class="app-footer">
    <section-social-media></section-social-media>
    <div class="app-bottom">
      <div class="copyright">
        &copy; 2016 Cosmos Network Foundation
      </div>
    </div>
  </footer>
</template>

<script>
import SectionSocialMedia from './SectionSocialMedia.vue'
export default {
  name: 'app-footer',
  components: {
    SectionSocialMedia
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.app-footer
  position relative

.app-bottom
  background #fff
  display flex
  flex-flow column
  justify-content space-between
  padding x 0

  .copyright
    padding 0 1rem
    color light
    text-align center
    line-height 2.25rem

@media screen and (min-width: 360px)
  .app-bottom
    .copyright
      line-height 2.5rem

@media screen and (min-width: 720px)
  .app-bottom
    flex-flow row
    padding x 0.5rem
</style>
