<template>
  <form-struct :submit="nextStep">
    <div slot="title">Donate BTC</div>
    <div slot="subtitle">Step 1 - Create a fundraise wallet.</div>

    <form-group :class="{ error: $v.fields.password.$error || $v.fields.confirmPassword.$error }">
      <label>Encrypt the wallet with a password.</label>

      <label class="hidden" for="fund-btc-password">Password</label>
      <field-group>
        <field
          id="fund-btc-password"
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

      <label class="hidden" for="fund-btc-confirm-password">Confirm Password</label>
      <field-group>
        <field
          id="fund-btc-confirm-password"
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
      <form-msg body="This is required to encrypt and access your wallet."></form-msg>
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
import FormStruct from './FormStruct'
import FormMsg from '@nylira/vue-form-msg'
import Field from '@nylira/vue-input'
import Btn from '@nylira/vue-button'
import VuelidateDebug from './VuelidateDebug'
import FormGroup from './FormGroup'
import FieldGroup from './FieldGroup'
import PasswordVisibleAddon from './PasswordVisibleAddon'
export default {
  name: 'fund-btc-01',
  components: {
    FormStruct,
    Field,
    Btn,
    VuelidateDebug,
    FormMsg,
    FormGroup,
    FieldGroup,
    PasswordVisibleAddon
  },
  computed: {
    amountBtc: {
      get () {
        return this.fields.atoms / this.config.COINS.BTC.EXCHANGE_RATE
      },
      set (newValue) {
        if (newValue === '.' || newValue === '' || newValue === ' ') {
          this.fields.atoms = 0
        } else {
          this.fields.atoms = newValue * this.config.COINS.BTC.EXCHANGE_RATE
        }
      }
    },
    ...mapGetters(['sessionUser', 'sessionReady', 'config'])
  },
  data: () => ({
    visible: {
      password: false,
      confirmPassword: false
    },
    fields: {
      atoms: 0,
      password: '',
      confirmPassword: ''
    }
  }),
  methods: {
    nextStep () {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.$store.commit('setBtcDonationPrice', this.config.COINS.BTC.EXCHANGE_RATE)
        this.$store.commit('setBtcDonationAtoms', this.fields.atoms)
        this.$store.dispatch('generateBtcDonationWallet', this.fields.password)
        this.$store.commit('setBtcDonationProgress', 2)
      } else {
        console.log('there was an error', this.$v)
      }
    },
    skipWalletCreation () {
      // we already have a wallet
      let encryptedSeed = this.sessionUser.wallets[0]
      this.$store.commit('setBtcDonationEncryptedSeed', encryptedSeed)
      this.$store.commit('setBtcDonationProgress', 'decrypt')
    },
    skipIfWalletExists () {
      if (this.sessionUser &&
        this.sessionUser.wallets &&
        this.sessionUser.wallets.length > 0) {
        this.skipWalletCreation()
      }
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0

    let done = this.$store.watch(() => this.sessionReady, () => {
      this.skipIfWalletExists()
      done()
    })
    this.skipIfWalletExists()
  },
  validations: {
    /*
    amountBtc: {
      required,
      between (value) {
        return between(this.config.COINS.BTC.MIN_DONATION,
          this.config.COINS.BTC.MAX_DONATION)(value)
      }
    }, */
    fields: {
      /*
      atoms: {
        required,
        between (value) {
          return between(this.config.ATOM.MIN_BUY,
            this.config.ATOM.MAX_BUY)(value)
        }
      }, */
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
      let el = document.querySelector('#fund-btc-password')
      if (newVal) {
        el.type = 'text'
      } else {
        el.type = 'password'
      }
    },
    'visible.confirmPassword'  (newVal, oldVal) {
      let el = document.querySelector('#fund-btc-confirm-password')
      if (newVal) {
        el.type = 'text'
      } else {
        el.type = 'password'
      }
    }
  }
}
</script>
