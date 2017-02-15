<template>
  <module size="sm">
    <header>
      <div class="title">Your Balance</div>
    </header>
    <div class="components">
      <div class="component">
        <div class="value" :title="num.full(balance.atoms)">
          <span class="integer">{{ num.int(balance.atoms) }}</span><span class="fraction">{{ num.frac(balance.atoms) }}</span></div>
        <div class="unit">atoms</div>
      </div>
    </div>
  </module>
</template>

<script>
import Module from './Module'
import { mapGetters } from 'vuex'
import num from '../scripts/num.js'
export default {
  components: {
    Module
  },
  computed: {
    ...mapGetters(['balance'])
  },
  data () {
    return {
      num: num
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'
</style>

