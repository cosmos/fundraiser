<template>
  <div :class="cssClass">
    <div class="ni-modal-container">
      <header class="ni-modal-header">
        <div class="ni-modal-title"><slot name="title"></slot></div>
      </header>
      <main class="ni-modal-main">
        <slot></slot>
      </main>
      <footer class="ni-modal-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
// import disableScroll from 'disable-scroll'
import Ps from 'perfect-scrollbar'
export default {
  computed: {
    cssClass () {
      let value = 'ni-modal'
      if (this.size === 'fullscreen' || this.size === 'fs') {
        value += ' ni-modal-fullscreen'
      }
      return value
    }
  },
  methods: {
    close () {
      this.$destroy()
    }
  },
  mounted () {
    // disableScroll.on()
    Ps.initialize(document.querySelector('.ni-modal-main'))
  },
  destroyed () {
    // disableScroll.off()
    Ps.destroy(document.querySelector('.ni-modal-main'))
  },
  props: ['size']
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.ni-modal
  position fixed
  top 0
  left 0
  z-index 1000

  width 100vw
  height 100vh
  background hsla(0,0,0,0.5)

  display flex
  justify-content center
  align-items center

  &.ni-modal-fullscreen
    .ni-modal-container
      max-height none
      max-width 40rem + 6rem
      height 100vh
      width 100vw
      display flex
      flex-flow column nowrap
    .ni-modal-main
      flex 1
      overflow-y scroll

.ni-modal-container
  background c-app-fg
  box-shadow hsla(0,0,0,0.25) 0 0.25rem 1rem

  max-width 30rem
  max-height 40rem
  
.ni-modal-header, .ni-modal-main
  border-bottom 1px solid bc

.ni-modal-header
  display flex
  align-items center
  justify-content space-between
  height 3rem + 0.0625rem

.ni-modal-main, .ni-modal-footer
  padding 1rem

.ni-modal-title
  font-weight 500
  padding 0 1rem

.ni-modal-close
  cursor pointer
  &:hover
    color link

.ni-modal-main > .ni-article-body
  margin -1rem

.ni-modal-footer > div
  display flex
  justify-content space-between
</style>
