<template>
  <div :class="cssClass">
    <template v-if="type=='desc'">{{ msg-body }}</template>
    <template v-else>{{ name }} {{ error }}</template>
  </div>
</template>

<script>
export default {
  computed: {
    cssClass () {
      let value = 'pz-form-msg '
      if (this.type) {
        value += 'pz-form-msg-error'
      } else {
        value += 'pz-form-msg-desc'
      }
      return value
    },
    error () {
      let msg = ''
      switch (this.type) {
        case 'required':
          msg = 'is required'; break
        case 'match':
          msg = 'must match'; break
        case 'minLength':
          msg = `must be longer than ${this.min} characters`; break
        case 'maxLength':
          msg = `must be shorter than ${this.max} characters`; break
        case 'length':
          msg = `must be between ${this.min} and ${this.max} characters`; break
        default:
          msg = 'must be valid'; break
      }
      return msg
    }
  },
  props: ['type', 'body', 'name', 'min', 'max']
}
</script>

<style lang="stylus">
.pz-form-msg
  font-size 0.75rem
  margin 0 0 0.5rem
  display flex
  &:before
    content ''
    font-family FontAwesome
    padding-right 0.35rem

  &.pz-form-msg-error
    color #f00
    &:before
      content '\f06a'
      color #f00

  &.pz-form-msg-desc
    color #666
    &:before
      content '\f059'
      color hsl(45,100%,50%)
</style>
