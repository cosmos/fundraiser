<template>
  <div class="ni-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ni-button-group'
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.ni-button-group
  margin-bottom 0.5rem
  max-width 40rem

  display flex
  .ni-btn-wrapper
    flex 1

  .ni-btn-wrapper + .ni-btn-wrapper
    .ni-btn
      border-left none

@media screen and (min-width: 768px)
  .ni-button-group
    margin-bottom 0.75rem
</style>
