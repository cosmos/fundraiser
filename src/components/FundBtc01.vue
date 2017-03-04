<template>
  <form-struct :submit="nextStep">
    <div slot="title">Donate BTC</div>
    <div slot="subtitle">Step 1</div>

    <form-group :class="{ error: $v.amountBtc.$error || $v.fields.atoms.$error }">
      <label for="fund-btc-amount-btc">Enter amount you wish to donate in BTC.</label>
      <label class="hidden" for="fund-btc-amount-btc">Amount in BTC</label>
      <field-group>
        <field id="fund-btc-amount-btc" type="number"
          v-model="amountBtc"
          @input="$v.amountBtc.$touch()"
          :min="config.COINS.BTC.MIN_DONATION"
          :max="config.COINS.BTC.MAX_DONATION"
          :step="config.COINS.BTC.MIN_DONATION"
          required>
        </field>
        <div class="ni-field-addon">BTC</div>
      </field-group>
      <form-msg
        name="BTC amount"
        type="required"
        v-if="!$v.amountBtc.required">
      </form-msg>
      <form-msg
        name="BTC amount"
        type="between"
        :min="config.COINS.BTC.MIN_DONATION"
        :max="config.COINS.BTC.MAX_DONATION"
        v-if="!$v.amountBtc.between">
      </form-msg>

      <label class="hidden" for="fund-btc-amount-atoms">Amount in Atoms</label>
      <field-group>
        <field
          id="fund-btc-amount-atoms"
          v-model="fields.atoms"
          type="number"
          @input="$v.fields.atoms.$touch()"
          :min="config.ATOM.MIN_BUY"
          :max="config.ATOM.MAX_BUY"
          :step="config.ATOM.MIN_BUY"
          required>
        </field>
        <div class="ni-field-addon">Atoms</div>
      </field-group>
      <form-msg
        name="Atom amount"
        type="required"
        v-if="!$v.fields.atoms.required">
      </form-msg>
      <form-msg
        name="Atom amount"
        type="between"
        :min="config.ATOM.MIN_BUY"
        :max="config.ATOM.MAX_BUY"
        v-if="!$v.fields.atoms.between">
      </form-msg>
      <form-msg
        body="Valuation: 1 BTC = 2,000 Atoms.">
      </form-msg>

      <vuelidate-debug name="amountBtc" :data="$v.amountBtc"></vuelidate-debug>
      <vuelidate-debug name="atoms" :data="$v.fields.atoms"></vuelidate-debug>
    </form-group>

    <form-group :class="{ error: $v.fields.password.$error || $v.fields.confirmPassword.$error }">
      <label>Create a wallet password.</label>

      <label class="hidden" for="fund-btc-password">Password</label>
      <field-group>
        <field
          type="password"
          placeholder="Enter your password"
          v-model="fields.password"
          @input="$v.fields.password.$touch()"
          required>
        </field>
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
import { required, between, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import FormStruct from './FormStruct'
import FormMsg from '@nylira/vue-form-msg'
import Field from '@nylira/vue-input'
import Btn from '@nylira/vue-button'
import VuelidateDebug from './VuelidateDebug'
import FormGroup from './FormGroup'
import FieldGroup from './FieldGroup'
export default {
  name: 'fund-btc-01',
  components: {
    FormStruct,
    Field,
    Btn,
    VuelidateDebug,
    FormMsg,
    FormGroup,
    FieldGroup
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
    fields: {
      atoms: 0,
      password: '',
      confirmPassword: ''
    }
  }),
  methods: {
    nextStep () {
      this.$v.$touch()
      console.log('next step!')
      if (!this.$v.$error) {
        this.$store.commit('setBtcDonationPrice', this.config.COINS.BTC.EXCHANGE_RATE)
        this.$store.commit('setBtcDonationAtoms', this.fields.atoms)
        this.$store.dispatch('generateBtcDonationWallet', this.fields.password)
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
    document.querySelector('#fund-btc-amount-btc').focus()

    let done = this.$store.watch(() => this.sessionReady, () => {
      this.skipIfWalletExists()
      done()
    })
    this.skipIfWalletExists()
  },
  validations: {
    amountBtc: {
      required,
      between (value) {
        return between(this.config.COINS.BTC.MIN_DONATION,
          this.config.COINS.BTC.MAX_DONATION)(value)
      }
    },
    fields: {
      atoms: {
        required,
        between (value) {
          return between(this.config.ATOM.MIN_BUY,
            this.config.ATOM.MAX_BUY)(value)
        }
      },
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
  }
}
</script>
