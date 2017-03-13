<template>
  <div :class="cssClass">
    <div class="ni-module-container">
      <slot name="overlay"></slot>
      <header class="ni-module-header">
        <div class="ni-module-title"><slot name="title"></slot></div>
        <div class="ni-module-menu"><slot name="menu"></slot></div>
      </header>
      <main class="ni-module-main">
        <slot></slot>
      </main>
      <footer class="ni-module-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cssClass () {
      let base = 'ni-module'
      if (this.size) base += ' ni-module-' + this.size
      return base
    }
  },
  props: ['size']
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.ni-module
  padding 0.25rem
  display flex

.ni-module-container
  flex 1
  background c-app-fg
  shadow()
  position relative

.ni-module-header
  display flex
  align-items center
  border-bottom 1px solid bc
  height 2rem

.ni-module-footer
  > div
    display flex
    justify-content center
    align-items center

    padding 0 1rem
    border-top 1px solid bc
    height 2rem
    background c-app-bg
    font-size 0.75rem
    color dim


.ni-module-title
  flex 1
  font-size 0.875rem
  padding 0 0.75rem
  font-weight 500

  white-space nowrap
  text-overflow ellipsis
  overflow hidden
  color dim

.ni-module-menu
  display flex
  padding 0 0.5rem

  a
    color txt
    font-size 0.75rem
    padding 0 0.25rem
    font-weight bold
    color link
    cursor pointer
    &.active
      color txt

.ni-module-main
  flex 1
  min-height 4.75rem
  .ni-kvs
    padding 0 !important

@media screen and (min-width: 768px)
  .ni-module-main
    font-size 1rem
    min-height 6.5rem
</style>
