<template>
  <div id="debug">
    <header><strong>DEBUG</strong> - Change Fundraiser State</header>
    <section>
      <main>
        <span>Debug Mode</span>
        <input type="checkbox" v-on:change="setDebugEnabled" checked />
      </main>
    </section>
    <section>
      <header>Time</header>
      <main>
        <select id="debug-time-select"  v-on:change="setTime">
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
        <input id="debug-is-active-checkbox" type="checkbox" v-on:change="setIsActive" value="on" />
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
      let { commit, dispatch } = this.$store
      let selection = e.target.selectedIndex
      if (selection === 0) {
        commit('setDebugStartDate', Date.now() + 10e3)
      } else if (selection === 1) {
        commit('setDebugStartDate', Date.now() - 60 * 60e3)
      } else if (selection === 2) {
        commit('setDebugStartDate', Date.now() - 24 * 60 * 60e3)
      } else if (selection === 3) {
        commit('setDebugStartDate', Date.now() - 15 * 24 * 60 * 60e3)
      }
      dispatch('checkTime')
    },
    setDebugEnabled (e) {
      let enabled = e.target.checked
      this.$store.commit('setDebugEnabled', enabled)
      if (enabled) {
        this.setIsActive({ target: document.getElementById('debug-is-active-checkbox') })
        this.setTime({ target: document.getElementById('debug-time-select') })
      }
    },
    setIsActive (e) {
      let isActive = e.target.checked
      this.$store.commit('setIsActive', isActive)
    }
  },
  mounted () {
    this.setDebugEnabled({ target: { checked: true } })
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
    padding 0 0.25rem
    line-height 1.5rem
    font-size 0.75rem
  > section
    padding 0.25rem
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
</style>
