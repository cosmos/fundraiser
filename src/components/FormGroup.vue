<template>
  <div class="ni-form-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ni-form-group'
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.ni-form-group
  background c-app-fg
  padding 0.5rem 1rem
  border-bottom 1px solid bc
  &:last-of-type
    border-bottom none

  label
    display block
    font-size 0.875rem
    font-weight 500
    padding 0.667rem 0 0.333rem
    line-height 1.25
    margin-bottom 0.375rem

  .ni-field
    margin-bottom 0.5rem

  .ni-form-msg-error
    display none

  &.error
    .ni-field
      border-color #f00
    .ni-form-msg-error
      display flex

@media screen and (min-width: 360px)
  .ni-form-group
    padding 0.625rem 1.25rem

@media screen and (min-width: 414px)
  .ni-form-group
    padding 0.725rem 1.5rem

@media screen and (min-width: 768px)
  .ni-form-group
    label
      font-size 1rem

</style>
