<template>
  <div class="ni-kv">
    <div class="ni-kv-container">
      <div class="ni-kv-value"><slot name="value"></slot></div>
      <div class="ni-kv-key"><slot name="key"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ni-kv'
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.ni-kv
  display flex
  flex-flow column no-wrap
  align-items center
  padding 1rem

.ni-kv-value
.ni-kv-key
  display flex
  justify-content center

.ni-kv-value
  font-size 1.5rem
  line-height 1
  margin-bottom 0.75rem
  font-weight 400
  color mcolor

  .fraction
    font-weight 300
    color dim

.ni-kv-key
  color light
  font-size 0.75rem
  font-weight 400

@media screen and (min-width: 414px)
  .ni-kv
    padding 0.75rem 1rem

@media screen and (min-width: 768px)
  .ni-kv
    padding 1.5rem
    
  .ni-kv-value
    font-size 1.5rem

  .ni-kv-key
    font-size 1rem
    font-weight 300
</style>
