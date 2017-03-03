<template>
  <div class="ni-modal">
    <div class="ni-modal-container">
      <header class="ni-modal-header">
        <div class="ni-modal-title"><slot name="title"></slot></div>
        <div class="ni-modal-close" @click="close"><i class="fa fa-times"></i></div>
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
import disableScroll from 'disable-scroll'
export default {
  data: () => ({
    visible: false
  }),
  methods: {
    close () {
      this.$destroy()
    }
  },
  mounted () {
    disableScroll.on()
  },
  destroyed () {
    disableScroll.off()
  }
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

.ni-modal-container
  background c-app-fg
  box-shadow hsla(0,0,0,0.25) 0 0.25rem 1rem

  max-width 30rem
  max-height 40rem
  
.ni-modal-header, .ni-modal-main, .ni-modal-footer
  padding 1rem

.ni-modal-header, .ni-modal-main
  border-bottom 1px solid bc

.ni-modal-header
  display flex
  align-items center
  justify-content space-between

.ni-modal-title
  font-weight 500

.ni-modal-close
  cursor pointer
  &:hover
    color link

.ni-modal-footer > div
  display flex
  justify-content space-between
</style>
