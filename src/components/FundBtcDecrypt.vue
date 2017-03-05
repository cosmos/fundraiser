<template>
  <form-struct :submit="nextStep">
    <div slot="title">Donate BTC</div>
    <div slot="subtitle">Enter your password to decrypt your pre-existing wallet.</div>

  <form-group :class="{ 'error': $v.fields.password.$error }">
    <label for="fund-btc-recall-password">Password</label>
    <field
      id="fund-btc-recall-password"
      type="password"
      placeholder="Enter your password"
      v-model="passwordValue"
      required>
    </field>
    <form-msg name="Password" type="required" v-if="!$v.fields.password.required"></form-msg>
    <form-msg name="Password" v-if="!$v.fields.password.isCorrect"></form-msg>
    <vuelidate-debug name="fields.password" :data="$v.fields.password"></vuelidate-debug>
  </form-group>

  <btn
    slot="reset"
    icon="angle-left"
    value="Start Over">
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
import cfr from 'cosmos-fundraiser'
import FormStruct from './FormStruct'
import FormGroup from './FormGroup'
import FormMsg from '@nylira/vue-form-msg'
import Field from '@nylira/vue-input'
import Btn from '@nylira/vue-button'
import VuelidateDebug from './VuelidateDebug'
export default {
  name: 'fund-btc-decrypt',
  components: {
    FormStruct,
    FormGroup,
    Field,
    Btn,
    VuelidateDebug,
    FormMsg
  },
  computed: {
    ...mapGetters(['btcDonation'])
  },
  data () {
    return {
      passwordValue: '',
      fields: {
        password: ''
      }
    }
  },
  methods: {
    nextStep () {
      this.fields.password = this.passwordValue
      this.$v.$touch()
      if (this.$v.$error) {
        console.log('errors in the form, not going anywhere')
      } else {
        this.$store.commit('setBtcDonationProgress', 4)
      }
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    document.querySelector('#fund-btc-recall-password').focus()
  },
  validations: {
    fields: {
      password: {
        required,
        isCorrect (password) {
          let encryptedSeed = this.btcDonation.encryptedSeed
          try {
            let seed = cfr.decryptSeed(encryptedSeed, password)
            let wallet = cfr.deriveWallet(seed)
            this.$store.commit('setBtcDonationWallet', wallet)
            return true
          } catch (err) {
            return false
          }
        }
      }
    }
  }
}
</script>
