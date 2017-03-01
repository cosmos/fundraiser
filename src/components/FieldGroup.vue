<template>
  <div class="ni-field-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ni-field-group',
  computed: {
    cssClass () {
      let value = 'ni form'
      if (this.width === 'narrow') value += ' ni-form-narrow'
      return value
    }
  },
  props: ['width']
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.ni-field-group
  display flex
  margin-bottom 0.5rem

  .ni-field, .ni-btn-wrapper
    flex 5
    margin 0

  .ni-btn-wrapper
    max-width 15rem

  .ni-field + .ni-btn-wrapper
    flex 1

  .ni-field + .ni-btn-wrapper .ni-btn
    border-left none

  .field-group-addon
    flex 1
</style>
