<template>
  <module size="sm">
    <header>
      <div class="title">Your Balance</div>
    </header>
    <div class="components">
      <div class="component">
        <div class="value"><span class="integer">{{ integerize(atoms) }}</span><span class="fraction">{{ fractionize(atoms) }}</span></div>
        <div class="unit">atoms</div>
      </div>
    </div>
  </module>
</template>

<script>
import Module from './Module'
export default {
  components: {
    Module
  },
  data () {
    return {
      atoms: 43240.059827
    }
  },
  methods: {
    integerize (num) {
      return Math.trunc(num)
    },
    fractionize (num) {
      let value = Math.trunc(num % 1 * 100000) / 100000
      return value.toString().substring(1)
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'
</style>

