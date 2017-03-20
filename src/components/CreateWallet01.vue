<template>
  <form-struct :submit="nextStep">
    <module-overlay slot="overlay" v-if="!FUNDRAISE_STARTED"></module-overlay>

    <div slot="title">Donate</div>
    <div slot="subtitle">Create a fundraiser wallet.</div>

    <form-group :class="{ error: $v.fields.password.$error || $v.fields.confirmPassword.$error }">
      <label>Encrypt your wallet with a password.</label>

      <label class="hidden" for="create-wallet-password">Password</label>
      <field-group>
        <field
          id="create-wallet-password"
          type="password"
          placeholder="Enter your password"
          v-model="fields.password"
          @input="$v.fields.password.$touch()"
          required>
        </field>
        <password-visible-addon v-model="visible.password">
        </password-visible-addon>
      </field-group>
      <form-msg name="Password" type="required" v-if="!$v.fields.password.required"></form-msg>
      <form-msg name="Password" type="length" min="8" max="1024" v-if="!$v.fields.password.minLength || !$v.fields.password.maxLength"></form-msg>
      <vuelidate-debug name="fields.password" :data="$v.fields.password"></vuelidate-debug>

      <label class="hidden" for="create-wallet-confirm-password">Confirm Password</label>
      <field-group>
        <field
          id="create-wallet-confirm-password"
          type="password"
          placeholder="Re-enter your password"
          v-model="fields.confirmPassword"
          @input="$v.fields.confirmPassword.$touch()"
          required>
        </field>
        <password-visible-addon v-model="visible.confirmPassword">
        </password-visible-addon>
      </field-group>
      <form-msg
        name="Password confirmation"
        type="required"
        v-if="!$v.fields.confirmPassword.required">
      </form-msg>
      <form-msg
        name="Passwords"
        type="match"
        v-if="!$v.fields.confirmPassword.sameAsPassword">
      </form-msg>
      <form-msg body="This should NOT be the same as your account password."></form-msg>
      <vuelidate-debug
        name="fields.confirmPassword"
        :data="$v.fields.confirmPassword">
      </vuelidate-debug>
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
import { required, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import moment from 'moment'
import Btn from '@nylira/vue-button'
import Field from '@nylira/vue-input'
import FieldGroup from './FieldGroup'
import FormStruct from './FormStruct'
import FormMsg from '@nylira/vue-form-msg'
import FormGroup from './FormGroup'
import ModuleOverlay from './ModuleOverlay'
import PasswordVisibleAddon from './PasswordVisibleAddon'
import VuelidateDebug from './VuelidateDebug'
export default {
  name: 'create-wallet-01',
  components: {
    Btn,
    Field,
    FieldGroup,
    FormGroup,
    FormMsg,
    FormStruct,
    ModuleOverlay,
    PasswordVisibleAddon,
    VuelidateDebug
  },
  computed: {
    FUNDRAISE_STARTED () {
      return Date.now() >= moment(this.config.START_DATETIME).valueOf()
    },
    ...mapGetters(['config'])
  },
  data: () => ({
    visible: {
      password: false,
      confirmPassword: false
    },
    fields: {
      password: '',
      confirmPassword: ''
    }
  }),
  methods: {
    nextStep () {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.$store.dispatch('generateDonationWallet', this.fields.password)
        this.$store.commit('setDonationProgress', 2)
        return
      }
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  },
  validations: {
    fields: {
      password: {
        required,
        minLength (value) { return minLength(this.config.PASSWORD_MIN)(value) },
        maxLength (value) { return maxLength(this.config.PASSWORD_MAX)(value) }
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  watch: {
    'visible.password' (newVal, oldVal) {
      let el = document.querySelector('#create-wallet-password')
      if (newVal) {
        el.type = 'text'
      } else {
        el.type = 'password'
      }
    },
    'visible.confirmPassword'  (newVal, oldVal) {
      let el = document.querySelector('#create-wallet-confirm-password')
      if (newVal) {
        el.type = 'text'
      } else {
        el.type = 'password'
      }
    }
  }
}
</script>
