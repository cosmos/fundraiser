<template>
  <form-struct :submit="nextStep">
    <module-overlay slot="overlay" v-if="!FUNDRAISE_STARTED"></module-overlay>

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
import moment from 'moment'
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
    FUNDRAISE_STARTED () {
      return Date.now() >= moment(this.config.START_DATETIME).valueOf()
    },
    ...mapGetters(['config', 'donation'])
  },
  methods: {
    nextStep () {
      this.$store.commit('setDonationProgress', 2)
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
</script>
