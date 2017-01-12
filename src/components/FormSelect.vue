<template>
  <div class="form-custom-select">
    <select :id="id" :value="options[value]" required>
      <option value="" v-if="empty">{{ placeholder }}</option>
      <option v-for="option in orderedOptions" v-bind:value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'form-select',
  computed: {
    orderedOptions () {
      return this.options.sort()
    }
  },
  props: {
    id: String,
    value: String,
    options: Array,
    placeholder: String,
    empty: Boolean
  }
}
</script>

<style lang="stylus">
@require '../styles/variables.styl'

.form-custom-select
  border 1px solid ibc
  height 2rem

  position relative
  width 100%

  &:after
    display block
    box-sizing border-box
    width 2rem
    height 2rem

    position absolute
    top -1px
    right -1px

    border 1px solid ibc
    background subtle-gradient

    font-family 'FontAwesome'
    content '\f0d7'
    text-align center
    line-height x*2 - 2px
    color dim

    pointer-events none

  select
    appearance none
    width 100%
    padding 0 0.5rem

    background #fff
    border none
    border-radius 0

    df()
    line-height 2*x - 2px
    height 2*x - 2px
</style>
