<template>
  <button class="pz-button" :type="btnType">
    <i v-if="btnIcon" :class="'fa fa-' + btnIcon" aria-hidden="true"></i>
    <span class="value" v-if="btnValue">{{ btnValue }}</span>
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

  padding 0 0.75rem
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

.pz-button
  btn()

  &.pz-button-link
    border-color transparent
    background transparent
    box-shadow none
    color link
    padding 0 0.5rem
    &:hover
      background transparent
      box-shadow none

  &.pz-button-small
    height 1.5rem
    font-size 0.75rem
    line-height 1rem
    padding 0 1rem

    i.fa
      font-size 0.75rem
      line-height 1

  &.pz-button-large
    height 3rem
    font-size 1.25rem
    font-weight normal
    padding 0 1rem
</style>
