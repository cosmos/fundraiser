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
    background c-app-fg
    box-shadow hsla(0,0,0,0.1) 0 1px 3px

  header
    height 2rem
    display flex
    align-items center
    border-bottom 1px dotted bc

    .title
      flex 1
      font-size 0.875rem
      padding 0 0.75rem
      font-weight 500

      white-space nowrap
      text-overflow ellipsis
      overflow hidden
    menu
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

  .body
    background c-app-fg
    padding 1rem

  .components, .ni-countdown
    display flex
    flex-flow column
    justify-content center

    padding 0.5rem 0
    background c-app-fg
    .icon
      font-size 1.5rem
      color light

  .component
    flex 1

    display flex
    flex-flow column no-wrap
    align-items center

    padding 1rem

    .value
      font-size 1.5rem
      line-height 1
      margin-bottom 0.75rem
      font-weight 400
      color mcolor
      .fraction
        font-weight 300

    .fraction
      color dim

    .unit
      color light
      font-size 0.75rem
      font-weight 400

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

@media screen and (min-width: 400px)
  .module
    .components, .ni-countdown
      padding 0.75rem 0
    .component
      padding 0.75rem 1rem

@media screen and (min-width: 720px)
  .module
    &.module-sm
      flex 0 0 50%
    .components, .ni-countdown
      padding 1rem 0
    .component
      padding 1rem 1rem
    .component
      .value
        font-size 1.5rem
      .unit
        font-size 1rem
        font-weight 300
</style>
