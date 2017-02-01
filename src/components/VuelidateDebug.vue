<template>
  <pre class="debug">{{ name }}: {{ data }}</pre>
</template>

<script>
export default {
  props: ['name', 'data']
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

pre.debug
  font-size 0.75rem
  mono()
  padding 0.5rem
  margin-bottom 0.5rem
  background c-app-bg
  line-height 1.25
  display none
</style>
