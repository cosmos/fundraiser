<template>
  <form-struct :submit="nextStep">
    <div slot="title">Donate {{ donation.currency }}</div>
    <div slot="subtitle">Confirm that you remember the mnemonic. If you've forgotten it, please start over.</div>

  <form-group :class="{ 'error': $v.fields.mnemonic.$error }">
    <label for="create-wallet-recall-mnemonic">Mnemonic</label>
    <field-group>
      <field
        id="create-wallet-recall-mnemonic"
        type="textarea"
        placeholder="Enter your mnemonic"
        v-model="mnemonicValue"
        required>
      </field>
    </field-group>
    <form-msg name="Mnemonic" type="required" v-if="!$v.fields.mnemonic.required"></form-msg>
    <form-msg name="Mnemonic" v-if="!$v.fields.mnemonic.matches"></form-msg>
    <vuelidate-debug name="fields.mnemonic" :data="$v.fields.mnemonic"></vuelidate-debug>
  </form-group>

  <btn
    @click="startOver"
    slot="reset"
    value="Reset">
  </btn>

  <btn
    slot="submit"
    type="submit"
    icon="angle-right"
    icon-pos="right"
    value="Continue">
  </btn>

  </form-struct>
</template>

<script>
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import FormStruct from './FormStruct'
import FormGroup from './FormGroup'
import FormMsg from '@nylira/vue-form-msg'
import Field from '@nylira/vue-input'
import FieldGroup from './FieldGroup'
import Btn from '@nylira/vue-button'
import VuelidateDebug from './VuelidateDebug'
export default {
  name: 'create-wallet-02',
  components: {
    FormStruct,
    FormGroup,
    Field,
    FieldGroup,
    Btn,
    VuelidateDebug,
    FormMsg
  },
  computed: {
    ...mapGetters(['donation'])
  },
  data () {
    return {
      mnemonicValue: '',
      fields: {
        mnemonic: ''
      }
    }
  },
  methods: {
    startOver () {
      this.$store.commit('setDonationProgress', 1)
    },
    nextStep () {
      this.fields.mnemonic = this.mnemonicValue
      this.$v.$touch()
      if (!this.$v.$error) {
        this.$store.commit('setDonationProgress', 3)
      }
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    document.querySelector('#create-wallet-recall-mnemonic').focus()
  },
  validations: {
    fields: {
      mnemonic: {
        required,
        matches (mnemonic) {
          return mnemonic === this.donation.mnemonic
        }
      }
    }
  }
}
</script>
