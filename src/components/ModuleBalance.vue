<template>
  <module size="sm">
    <header>
      <div class="title">Your Balance</div>
    </header>
    <div class="body">
      <div class="var">
        <div class="value">43,240</div>
        <div class="unit">.23435 CAT</div>
      </div>
    </div>
    <footer>
      <a href="#"><i class="fa fa-history"></i> Transaction History</a>
    </footer>
  </module>
</template>

<script>
import Module from './Module'
export default {
  components: {
    Module
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'
</style>

