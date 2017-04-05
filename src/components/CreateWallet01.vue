<template>
  <form-struct :submit="nextStep">
    <module-overlay slot="overlay" v-if="!fundraiserActive"></module-overlay>

    <div slot="title">Donate {{ donation.currency }}</div>
    <div slot="subtitle">Copy this mnemonic and store it in a secure location. You'll need it to access your atoms later.</div>

    <div slot="subtitle" v-if="!fundraiserActive">
      <br />
      <p class="end-notice">
        <strong>NOTICE: </strong>
        The fundraiser is not active. If you choose to donate, <strong>you will NOT receive Atoms</strong>.
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
import cfr from 'cosmos-fundraiser'
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
    fundraiserActive () {
      console.log('started/ended', this.fundraiserStarted, this.fundraiserEnded)
      return this.fundraiserStarted && !this.fundraiserEnded
    },
    ...mapGetters(['config', 'donation', 'fundraiserEnded'])
  },
  data: () => ({
    fundraiserStarted: false
  }),
  methods: {
    nextStep () {
      this.$store.commit('setDonationProgress', 2)
    },
    enterMnemonic () {
      this.$store.commit('setDonationProgress', 'input')
    },
    watchFundraiserStart () {
      let self = this
      cfr.ethereum.fetchIsActive('', function (err, res) {
        if (err) return
        if (res === 1) self.fundraiserStarted = true
        else self.fundraiserStarted = false
        // console.log('this.fundraiserStarted', self.fundraiserStarted)
      })
    }
  },
  mounted () {
    this.watchFundraiserStart()
    setInterval(() => this.watchFundraiserStart(), 1000)

    this.$store.dispatch('fetchFundraiserStatus')
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
</script>

<style lang="stylus">
  .end-notice
    color red
</style>
