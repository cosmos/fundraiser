<template>
<form class="form form-narrow" v-on:submit.prevent.default="nextStep">

  <div class="form-header">
    <div class="title">Pay with BTC</div>
    <div class="subtitle">Step 1</div>
  </div>

  <div class="form-group" :class="{ 'form-group-error': $v.amountBtc.$error || $v.fields.atoms.$error }">
    <label for="fund-btc-amount-btc">Enter amount to purchase in either Bitcoin or Atoms.</label>

    <label class="hidden" for="fund-btc-amount-btc">Amount in BTC</label>
    <div class="input-group">
      <field id="fund-btc-amount-btc" type="number"
        v-model="amountBtc"
        @input="$v.amountBtc.$touch()"
        :min="config.COINS.BTC.MIN_PAYMENT"
        :max="config.COINS.BTC.MAX_PAYMENT"
        :step="config.COINS.BTC.MIN_PAYMENT"
        required>
      </field>
      <div class="input-group-addon">BTC</div>
    </div>
    <form-msg
      name="BTC amount"
      type="required"
      v-if="!$v.amountBtc.required">
    </form-msg>
    <form-msg
      name="BTC amount"
      type="between"
      :min="config.COINS.BTC.MIN_PAYMENT"
      :max="config.COINS.BTC.MAX_PAYMENT"
      v-if="!$v.amountBtc.between">
    </form-msg>

    <label class="hidden" for="fund-btc-amount-atoms">Amount in Atoms</label>
    <div class="input-group">
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
      <div class="input-group-addon">Atoms</div>
    </div>
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
      body="Price: 1 BTC buys 2,000 Atoms.">
    </form-msg>

    <vuelidate-debug name="amountBtc" :data="$v.amountBtc"></vuelidate-debug>
    <vuelidate-debug name="atoms" :data="$v.fields.atoms"></vuelidate-debug>
  </div>

  <div class="form-group":class="{ 'form-group-error': $v.fields.password.$error || $v.fields.confirmPassword.$error }">
    <label>Create a wallet password.</label>

    <label class="hidden" for="fund-btc-password">Password</label>
    <div class="input-group">
      <field
        type="password"
        placeholder="Enter your password"
        v-model="fields.password"
        @input="$v.fields.password.$touch()"
        required>
      </field>
    </div>
    <form-msg name="Password" type="required" v-if="!$v.fields.password.required"></form-msg>
    <form-msg name="Password" type="length" min="8" max="1024" v-if="!$v.fields.password.minLength || !$v.fields.password.maxLength"></form-msg>
    <vuelidate-debug name="fields.password" :data="$v.fields.password"></vuelidate-debug>

    <label class="hidden" for="fund-btc-confirm-password">Confirm Password</label>
    <div class="input-group">
      <field
        id="fund-btc-confirm-password"
        type="password"
        placeholder="Re-enter your password"
        v-model="fields.confirmPassword"
        @input="$v.fields.confirmPassword.$touch()"
        required>
      </field>
    </div>
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
  </div>

  <div class="form-footer">
    <div></div>
    <btn
      type="submit"
      icon="angle-right"
      icon-pos="right"
      value="Continue">
    </btn>
  </div>

</form>
</template>

<script>
import { required, between, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import FormMsg from '@nylira/vue-form-msg'
import Field from '@nylira/vue-input'
import Btn from '@nylira/vue-button'
import VuelidateDebug from './VuelidateDebug'
export default {
  name: 'fund-btc-01',
  components: {
    Field,
    Btn,
    VuelidateDebug,
    FormMsg
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
    ...mapGetters(['sessionUser', 'config'])
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
      if (!this.$v.$error) {
        this.$store.commit('setBtcTransactionUserId', this.sessionUser.uid)
        this.$store.commit('setBtcTransactionPrice', this.config.COINS.BTC.EXCHANGE_RATE)
        this.$store.commit('setBtcTransactionAtoms', this.fields.atoms)
        this.$store.commit('setBtcTransactionHash', this.fields.password)
        this.$store.commit('setBtcTransactionProgress', 2)
      }
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    document.querySelector('#fund-btc-amount-btc').focus()
  },
  validations: {
    amountBtc: {
      required,
      between (value) {
        return between(this.config.COINS.BTC.MIN_PAYMENT,
          this.config.COINS.BTC.MAX_PAYMENT)(value)
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
