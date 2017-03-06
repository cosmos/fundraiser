<template>
  <div class="ni-password-visibility-addon ni-field-addon" @click="toggleVisibility">
    <i v-if="value" class="fa fa-eye-slash"></i>
    <i v-else class="fa fa-eye"></i>
  </div>
</template>

<script>
export default {
  name: 'password-visible-addon',
  methods: {
    toggleVisibility () {
      let value = !this.value
      this.$emit('input', value)
    }
  },
  props: ['value']
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.ni-password-visibility-addon
  cursor pointer
  &:hover
    i.fa
      color link
</style>
