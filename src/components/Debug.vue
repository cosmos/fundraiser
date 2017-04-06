<template>
  <div id="debug">
    <header><strong>DEBUG</strong> - Change Fundraiser State</header>
    <section>
      <main>
        <select v-on:change="setTime">
          <option>Before Start</option>
          <option>After Start</option>
          <option>After Hidden Cap Period</option>
          <option>After End</option>
        </select>
      </main>
    </section>
    <section>
      <header>ETH contract isActive</header>
      <main>
        <select>
          <option>0</option>
          <option>1</option>
        </select>
      </main>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Btn from '@nylira/vue-button'
import BtnGroup from './BtnGroup'
export default {
  name: 'debug',
  components: {
    Btn,
    BtnGroup
  },
  computed: {
    ...mapGetters(['debug'])
  },
  methods: {
    setTime (e) {
      let selection = e.target.selectedIndex
      this.$store.commit('setDebugFundraiserTime', selection)
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
  width 70vw
  max-width 14rem
  shadow()
  color #fff

  > header
    border-bottom 1px solid bc
    padding 0 0.5rem
    line-height 1.5rem
    font-size 0.75rem
  > section
    padding 0.5rem
    > main
      display flex
      flex-flow column nowrap
      .ni-btn-group:last-of-type
        margin-bottom 0
      .ni-btn
        font-size 0.75rem
      .ni-btn-active .ni-btn
        background link
        border 1px solid lighten(link, 25%)
        color c-app-fg

@media screen and (min-width: 360px)
  #debug > section > main .ni-btn
    font-size 1rem
@media screen and (min-width: 768px)
  #debug > header
    padding 0 1rem
  #debug > section
    padding 1rem
</style>
