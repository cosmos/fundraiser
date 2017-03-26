<template>
  <div class="ni-module-overlay">
    <div class="ni-module-overlay-text">
      <slot>Fundraiser has not started yet</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ni-module-overlay'
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.ni-module-overlay
  background hsla(0,0,0,0.5)
  position absolute
  top 0
  left 0
  bottom 0
  right 0

  display flex
  align-items flex-start

  transition ease-in-out all 100ms

  &:hover
    background hsla(0,0,0,0.11)

.ni-module-overlay-text
  width 100%
  background hsla(0,0,0,0.666)

  line-height 2
  font-size 1rem
  color c-app-fg
  text-align center

  user-select none

  transition ease-in-out all 100ms
</style>
