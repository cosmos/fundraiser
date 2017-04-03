<template>
  <module class="module-donations">
    <module-overlay slot="overlay" v-if="!fundraiserActive"></module-overlay>
    <div slot="title">View Donations</div>
    <ul>
      <li>
        <a href="https://blockchain.info/address/15ZcBgrLnjXsHGCv7iiVcxhCf9xK9xQu4B">BTC Donations</a>
      </li>
      <li>
        <a href="https://etherscan.io/address/0xa4028F2aec0ad18964e368338E5268FebB4F5423">ETH Donations</a>
      </li>
    </ul>
  </module>
</template>

<script>
import { mapGetters } from 'vuex'
import hasFundraiseStarted from '../scripts/hasFundraiseStarted'
import Module from './Module'
import ModuleOverlay from './ModuleOverlay'
export default {
  name: 'module-donations',
  components: {
    Module,
    ModuleOverlay
  },
  computed: {
    fundraiserActive () {
      console.log('started/ended', this.fundraiserStarted, this.fundraiserEnded)
      return this.fundraiserStarted && !this.fundraiserEnded
    },
    ...mapGetters(['config', 'donations', 'fundraiserEnded'])
  },
  data () {
    return {
      hasFundraiseStarted,
      fundraiserStarted: false,
      details: true
    }
  },
  methods: {
    watchFundraiserStart () {
      let start = this.config.START_DATETIME
      this.fundraiserStarted = hasFundraiseStarted(start)
    }
  },
  mounted () {
    this.watchFundraiserStart()
    setInterval(() => this.watchFundraiserStart(), 1000)
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'
</style>
