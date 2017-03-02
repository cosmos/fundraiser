<template>
  <div class="ni-modules">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ni-modules'
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.ni-modules
  max-width 1024px
  margin 0 auto
  padding 0.25rem

  .ni-module
    flex 1 1 100%
    padding 0.25rem

  display flex
  flex-flow row wrap

@media screen and (min-width: 768px)
  .ni-modules
    padding 0.333rem

    .ni-module
      padding 0.333rem

      &.ni-module-sm
        flex 1 1 50%

@media screen and (min-width: 1024px)
  .ni-modules
    padding 0.375rem

    .ni-module
      padding 0.375rem
</style>
