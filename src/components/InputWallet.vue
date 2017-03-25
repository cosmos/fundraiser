<template>
  <form-struct :submit="nextStep">
    <module-overlay slot="overlay" v-if="!FUNDRAISE_STARTED"></module-overlay>

    <div slot="title">Donate {{ donation.currency }}</div>
    <div slot="subtitle">Enter a pre-existing mnemonic</div>

    <form-group>
      <label>Mnemonic</label>
      <label class="hidden" for="create-wallet-mnemonic">Mnemonic</label>
      <field-group>
        <field
          id="create-wallet-recall-mnemonic"
          type="textarea"
          placeholder="Enter your mnemonic"
          v-model="mnemonicValue"
          required>
        </field>
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
  name: 'input-wallet',
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
  data () {
    return {
      mnemonicValue: ''
    }
  },
  computed: {
    FUNDRAISE_STARTED () {
      return Date.now() >= moment(this.config.START_DATETIME).valueOf()
    },
    ...mapGetters(['config', 'donation'])
  },
  methods: {
    nextStep () {
      this.$store.dispatch('setDonationMnemonicAndWallet', this.mnemonicValue)
      this.$store.commit('setDonationProgress', 3)
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
</script>
