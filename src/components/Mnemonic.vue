<template>
  <div class="ni-mnemonic">
    {{ value}}
  </div>
</template>

<script>
export default {
  props: ['value']
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.ni-mnemonic
  border 1px solid bc
  padding 0.5rem 0.75rem
  mono()
  background lighten(bc, 50%)
  user-select none
</style>

