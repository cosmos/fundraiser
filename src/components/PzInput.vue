<template>
  <input v-else
    class="pz-input"
    :type="inputType"
    :placeholder="inputPlaceholder">
  </input>
</template>

<script>
export default {
  name: 'input',
  props: ['input-placeholder', 'input-value', 'input-type']
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

/*==============================================================================*/
// Input

.pz-input
  -webkit-appearance none

  height 2rem
  border 1px solid ibc
  vertical-align top
  padding x*0.25 - 1px 0.5rem

  df()
  line-height x*1.5
  border-radius 0
  display block
  width 100%

  &:disabled
    color dim
    text-shadow none
    box-shadow none
    background mbg

.pz-input:focus
  box-shadow 0 0 x*0.5 lighten(mcolor,75%)
  border-color link

textarea.pz-input
  height 8rem

/*==============================================================================*/
// Input Addons

.input-group-addon
  background mbg
  border 1px solid ibc
  border-left none
  padding 0 0.5rem

  color dim
  line-height x*2 - 2px
  font-size 0.75rem

@media screen and (min-width: 360px)
  .input-group-addon
    font-size 1rem

/*==============================================================================*/
// Input Placeholders 

/* WebKit, Blink, Edge */
.pz-input::-webkit-input-placeholder
  color placeholder-color

/* Mozilla Firefox 4 to 18 */
.pz-input:-moz-placeholder
  color placeholder-color
  opacity 1

/* Mozilla Firefox 19+ */
.pz-input::-moz-placeholder
  color placeholder-color
  opacity 1

/* Internet Explorer 10-11 */
.pz-input:-ms-input-placeholder
  color placeholder-color

/* Standard (https//drafts.csswg.org/selectors-4/#placeholder) */
.pz-input:placeholder-shown
  color placeholder-color
</style>
