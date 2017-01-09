<template>
  <button class="btn" :type="btnType">
    <i :class="'fa fa-' + btnIcon" v-if="btnIcon"></i>
    <span class="value">{{ btnValue }}</span>
  </button> 
</template>
<script>
export default {
  name: 'btn',
  props: ['btn-value', 'btn-icon', 'btn-type']
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

button::before,
button::after
  content ''
  flex 1 0 auto

btn()
  background subtle-gradient
  border 1px solid ibc
  box-shadow inset hsla(0,0,100%,0.5) 0 0 0.5rem

  padding 0 1rem
  margin 0

  df()
  font-weight 400
  height 2rem
  line-height 1

  cursor pointer
  user-select none

  display flex
  justify-content center
  align-items center
  -webkit-appearance none

  text-align center

  &:hover
    background subtle-gradient-hover
    box-shadow inset #fff 0 0 0.75rem
    color #000
    text-decoration none

  &:active
    padding-top 0.5rem
    padding-bottom 0.5*x - 2px

  &.disabled
  &[disabled]
    opacity 0.333
    cursor not-allowed
    user-select none
    color light
    &:focus
      outline none

  i.fa
    font-size 1rem
    line-height 1

  i.fa + .value
    padding-left 0.5rem

.btn
  btn()

  &.btn-link
    border-color transparent
    background transparent
    box-shadow none
    color link
    padding 0 0.5rem
    &:hover
      border-color transparent
      background transparent
      box-shadow none

  &.btn-small
    height x*1.5
    font-size 0.75*x
    line-height 1rem
    padding 0.375*x - 1px x
    &:active
      padding-top 0.375*x
      padding-bottom 0.375*x - 2px

    i.fa
      font-size 0.75rem
      line-height 1

  &.btn-large
    height x*3
    font-size 1.25*x
    font-weight normal
    padding 0.875*x x
    &:active
      padding-top 0.875*x
      padding-bottom 0.875*x - 2px
</style>
