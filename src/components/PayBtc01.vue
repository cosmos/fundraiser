<template>
<form class="form" v-on:submit.prevent.default="nextStep">

  <div class="form-header">
    <div class="title">Step 1</div>
  </div>

  <div class="form-group" :class="{ 'form-group-error': $v.amountBtc.$error || $v.fields.atoms.$error }">
    <label for="fund-btc-amount-btc">Enter amount to purchase in either Bitcoin or Atoms.</label>

    <label class="hidden" for="fund-btc-amount-btc">Amount in BTC</label>
    <div class="input-group">
      <field
        id="fund-btc-amount-btc"
        type="number"
        v-model="amountBtc"
        @input="$v.amountBtc.$touch()"
        min="0.1"
        max="500"
        step="0.01"
        required
      >
      </field>
      <div class="input-group-addon">BTC</div>
    </div>
    <form-msg name="BTC amount" type="required" v-if="!$v.amountBtc.required"></form-msg>
    <form-msg name="BTC amount" type="between" min="0.01" max="500" v-if="!$v.amountBtc.between"></form-msg>

    <label class="hidden" for="fund-btc-amount-atoms">Amount in Atoms</label>
    <div class="input-group">
      <field
        id="fund-btc-amount-atoms"
        v-model="fields.atoms"
        type="number"
        @input="$v.fields.atoms.$touch()"
        min="20.00"
        max="1000000"
        step="20"
        required
      >
      </field>
      <div class="input-group-addon">Atoms</div>
    </div>
    <form-msg name="Atom amount" type="required" v-if="!$v.fields.atoms.required"></form-msg>
    <form-msg name="Atom amount" type="between" min="20" max="1,000,000" v-if="!$v.fields.atoms.between"></form-msg>
    <form-msg body="Price: 1 BTC buys 2,000 Atoms."></form-msg>

    <vuelidate-debug name="amountBtc" :data="$v.amountBtc"></vuelidate-debug>
    <vuelidate-debug name="atoms" :data="$v.fields.atoms"></vuelidate-debug>
  </div>

  <div class="form-group" :class="{ 'form-group-error': $v.fields.password.$error || $v.fields.confirmPassword.$error }">
    <label>Create a wallet password.</label>

    <label class="hidden" for="fund-btc-password">Password</label>
    <div class="input-group">
      <field
        type="password"
        placeholder="Enter your password"
        v-model="fields.password"
        @input="$v.fields.password.$touch()"
        required
      >
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
        required
      >
      </field>
    </div>
    <form-msg name="Password confirmation" type="required" v-if="!$v.fields.confirmPassword.required"></form-msg>
    <form-msg name="Passwords" type="match" v-if="!$v.fields.confirmPassword.sameAsPassword"></form-msg>

    <form-msg body="This is required to encrypt and access your wallet."></form-msg>
    <form-msg body="This should NOT be the same as your account password."></form-msg>
    <vuelidate-debug name="fields.confirmPassword" :data="$v.fields.confirmPassword"></vuelidate-debug>
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
import { required, between, sameAs, minLength } from 'vuelidate/lib/validators'
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
          this.fields.atoms = newValue * 2000.00
        }
      }
    },
    ...mapGetters(['sessionUser', 'config'])
  },
  data () {
    return {
      fields: {
        // atoms: 1000,
        // password: 'blowfish',
        // confirmPassword: 'blowfish'
        atoms: 0,
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    nextStep () {
      this.$v.$touch()
      let data = this.fields
      if (this.$v.$error) {
        console.log('errors in the form, not going anywhere')
      } else {
        this.$store.commit('setBtcTransactionUserId', this.sessionUser.uid)
        this.$store.commit('setBtcTransactionPrice', this.config.COINS.BTC.EXCHANGE_RATE)
        this.$store.commit('setBtcTransactionAtoms', data.atoms)
        this.$store.commit('setBtcTransactionHash', data.password)
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
      between: between(0.01, 500)
    },
    fields: {
      atoms: {
        required,
        between: between(20, 1000000)
      },
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  }
}
</script>
