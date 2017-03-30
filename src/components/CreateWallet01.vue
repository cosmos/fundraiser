<template>
  <form-struct :submit="nextStep">
    <module-overlay slot="overlay" v-if="!fundraiserStarted"></module-overlay>

    <div slot="title">Donate {{ donation.currency }}</div>
    <div slot="subtitle">Copy this mnemonic and store it in a secure location. You'll need it to access your atoms later.</div>

    <div slot="subtitle" v-if="fundraiserEnded">
      <br />
      <p class="end-notice">
        <strong>NOTICE: </strong>
        The fundraiser has ended. If you choose to donate, <strong>you will NOT receive Atoms</strong>.
      </p>
    </div>

    <form-group>
      <label>Write this down.</label>
      <label class="hidden" for="create-wallet-mnemonic">Mnemonic</label>
      <field-group>
        <mnemonic :value="donation.mnemonic"></mnemonic>
      </field-group>
    </form-group>

    <btn
      @click.native="enterMnemonic"
      slot="reset"
      value="Enter your existing mnemonic">
    </btn>

    <btn
      slot="submit"
      type="submit"
      icon="angle-right"
      icon-pos="right"
      value="Continue">
    </btn>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import hasFundraiseStarted from '../scripts/hasFundraiseStarted'
import Btn from '@nylira/vue-button'
import FieldGroup from './FieldGroup'
import FormStruct from './FormStruct'
import FormGroup from './FormGroup'
import Mnemonic from './Mnemonic'
import ModuleOverlay from './ModuleOverlay'
export default {
  name: 'create-wallet-01',
  components: {
    Btn,
    FieldGroup,
    FormGroup,
    FormStruct,
    Mnemonic,
    ModuleOverlay
  },
  computed: {
    ...mapGetters(['config', 'donation', 'fundraiserEnded'])
  },
  data: () => ({
    hasFundraiseStarted,
    fundraiserStarted: false
  }),
  methods: {
    nextStep () {
      this.$store.commit('setDonationProgress', 2)
    },
    enterMnemonic () {
      this.$store.commit('setDonationProgress', 'input')
    },
    watchFundraiseStart () {
      let start = this.config.START_DATETIME
      this.fundraiserStarted = hasFundraiseStarted(start)
    }
  },
  mounted () {
    this.$store.dispatch('fetchFundraiserStatus')
    this.watchFundraiseStart()
    setInterval(() => this.watchFundraiseStart(), 1000)
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
</script>

<style lang="stylus">
  .end-notice
    color red
</style>
