<template>
  <div :class="cssClass">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cssClass () {
      let base = 'module'
      if (this.size) base += ' module-' + this.size
      return base
    }
  },
  props: ['size']
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.module
  padding 0.25rem
  min-width 0

  .container
    border 1px solid bc

  header
    height 2rem
    display flex
    align-items center
    border-bottom 1px dotted bc

    .title
      text-transform uppercase
      font-weight bold
      font-size 0.75rem
      padding 0 0.5rem
      color light

      white-space nowrap
      text-overflow ellipsis
      overflow hidden

  .body
    background c-app-fg
    .vars
      display flex
      justify-content center
      .icon
        font-size 1.5rem
        color light
    .var
      display flex
      flex-flow column no-wrap
      padding 0.75rem 1rem
      align-items center
      .value
        font-size 1.5rem
        line-height 1
        margin-bottom 0.5rem
        color mcolor
      .unit
        color light

  footer
    height 2rem

    padding 0 0.5rem

    border-top 1px solid bc

    display flex
    align-items center

    font-size 0.75rem
    color dim

    a
      font-weight 400
      &.active
        color txt
    a + a
      margin-left 0.5rem
    p
      white-space nowrap
      text-overflow ellipsis
      overflow hidden

@media screen and (min-width: 720px)
  .module
    .body
      .var
        .value
          font-size 2rem
        .unit
          font-size 1.25rem
</style>
