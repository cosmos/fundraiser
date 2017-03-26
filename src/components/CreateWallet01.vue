<template>
  <form-struct :submit="nextStep">
    <module-overlay slot="overlay" v-if="!fundraiseStarted"></module-overlay>

    <div slot="title">Donate {{ donation.currency }}</div>
    <div slot="subtitle">Copy this mnemonic and store it in a secure location. You'll need it to access your atoms later.</div>

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
import Field from '@nylira/vue-input'
import FieldGroup from './FieldGroup'
import FormStruct from './FormStruct'
import FormMsg from '@nylira/vue-form-msg'
import FormGroup from './FormGroup'
import Mnemonic from './Mnemonic'
import ModuleOverlay from './ModuleOverlay'
export default {
  name: 'create-wallet-01',
  components: {
    Btn,
    Field,
    FieldGroup,
    FormGroup,
    FormMsg,
    FormStruct,
    Mnemonic,
    ModuleOverlay
  },
  computed: {
    ...mapGetters(['config', 'donation'])
  },
  data: () => ({
    hasFundraiseStarted,
    fundraiseStarted: false
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
      this.fundraiseStarted = hasFundraiseStarted(start)
    }
  },
  mounted () {
    this.watchFundraiseStart()
    setInterval(() => this.watchFundraiseStart(), 1000)
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
</script>
