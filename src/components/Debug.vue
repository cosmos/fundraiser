<template>
  <div id="debug">
    <header>DEBUG</header>
    <section>
      <header>Change Fundraiser State</header>
      <main>
        <btn-group>
          <btn @click.native="reset" value="Reset FR"></btn>
          <btn @click.native="start" value="Start FR"></btn>
          <btn @click.native="end" value="End FR"></btn>
        </btn-group>
      </main>
    </section>
  </div>
</template>

<script>
import Btn from '@nylira/vue-button'
import BtnGroup from './BtnGroup'
export default {
  name: 'debug',
  components: {
    Btn,
    BtnGroup
  },
  methods: {
    reset () {
      this.$store.commit('setDebugFundraiserStatus', -1)
    },
    start () {
      this.$store.commit('setDebugFundraiserStatus', 0)
    },
    end () {
      this.$store.commit('setDebugFundraiserStatus', 1)
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

bc = txt

#debug
  position fixed
  bottom 0
  left 0
  background hsla(0,0,0,0.75)
  width 100vw
  max-width 40rem
  shadow()
  color #fff

  > header
    border-bottom 1px solid bc
    text-transform uppercase
    font-weight bold
    padding 0 1rem
    line-height 1.5rem
    font-size 0.75rem
  > section
    padding 0.5rem 1rem
    > header
      font-size 0.875rem
      margin-bottom 0.5rem
    > main
      display flex
      flex-flow column nowrap
</style>
