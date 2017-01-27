<template>
<form class="form" v-on:submit.prevent.default="nextStep">

  <div class="form-header">
    <div class="title">Step 1</div>
  </div>

  <div class="form-group">
    <label>Enter amount to purchase in either Bitcoin or Atoms.</label>
    <div class="input-group"
      :class="{ 'input-group-error': $v.amountBtc.$error }">
      <vue-input
        v-model="amountBtc"
        @input="$v.amountBtc.$touch()"
        min="0.1"
        max="500"
        required
      >
      </vue-input>
      <div class="input-group-addon">BTC</div>
    </div>
    <div class="input-group"
      :class="{ 'input-group-error': $v.formData.atoms.$error }">
      <vue-input
        v-model="formData.atoms"
        @input="$v.formData.atoms.$touch()"
        min="20.00"
        max="1000000"
        step="10"
        required
      >
      </vue-input>
      <div class="input-group-addon">Atoms</div>
    </div>
    <div class="form-error" v-if="!$v.amountBtc.required">
      BTC amount is required
    </div>
    <div class="form-error" v-if="!$v.amountBtc.between">
      BTC amount must be between 0.01 and 500
    </div>
    <div class="form-error" v-if="!$v.formData.atoms.required">
      Atom amount is required
    </div>
    <div class="form-error" v-if="!$v.formData.atoms.between">
      Atom amount must be between 20 and 1,000,000
    </div>
    <div class="form-desc">
      Price: 1 BTC buys 2,000 Atoms.
    </div>
    <vuelidate-debug name="amountBtc" :data="$v.amountBtc"></vuelidate-debug>
    <vuelidate-debug name="atoms" :data="$v.formData.atoms"></vuelidate-debug>
  </div>

  <div class="form-group">
    <label>Enter a valid email address.</label>
    <div class="input-group"
      :class="{ 'input-group-error': $v.formData.email.$error }">
      <vue-input
        input-type="email"
        input-placeholder="Enter your email"
        v-model="formData.email"
        @input="$v.formData.email.$touch()"
        required
      >
      </vue-input>
    </div>

    <div class="form-error" v-if="!$v.formData.email.required">
      Email is required
    </div>
    <div class="form-error" v-if="!$v.formData.email.email">
      Email must be valid
    </div>
    <vuelidate-debug name="formData.email" :data="$v.formData.email"></vuelidate-debug>

    <div class="input-group"
      :class="{ 'input-group-error': $v.formData.confirmEmail.$error }">
      <vue-input
        input-type="email"
        input-placeholder="Re-enter your email"
        v-model="formData.confirmEmail"
        @input="$v.formData.confirmEmail.$touch()"
        required
      >
      </vue-input>
    </div>

    <div class="form-error" v-if="!$v.formData.confirmEmail.required">
      Email confirmation is required
    </div>
    <div class="form-error" v-if="!$v.formData.confirmEmail.sameAsEmail">
      Emails must be identical
    </div>
    <vuelidate-debug name="formData.confirmEmail" :data="$v.formData.confirmEmail"></vuelidate-debug>

    <div class="form-desc">
      Your wallet backup will be emailed to this address.
    </div>

  </div>

  <div class="form-group">
    <label>Enter a password.</label>
    <div class="input-group"
      :class="{ 'input-group-error': $v.formData.password.$error }">
      <vue-input
        input-type="password"
        input-placeholder="Enter your password"
        v-model="formData.password"
        @input="$v.formData.password.$touch()"
        required
      >
      </vue-input>
    </div>

    <div class="form-error" v-if="!$v.formData.password.required">
      Password is required
    </div>
    <div class="form-error" v-if="!$v.formData.password.minLength">
      Password must be at least 8 characters
    </div>
    <vuelidate-debug name="formData.password" :data="$v.formData.password"></vuelidate-debug>

    <div class="input-group"
      :class="{ 'input-group-error': $v.formData.confirmPassword.$error }">
      <vue-input
        input-type="password"
        input-placeholder="Re-enter your password"
        v-model="formData.confirmPassword"
        @input="$v.formData.confirmPassword.$touch()"
        required
      >
      </vue-input>
    </div>

    <div class="form-error" v-if="!$v.formData.confirmPassword.required">
      Password confirmation is required
    </div>
    <div class="form-error" v-if="!$v.formData.confirmPassword.sameAsPassword">
      Passwords must be identical
    </div>
    <vuelidate-debug name="formData.confirmPassword" :data="$v.formData.confirmPassword"></vuelidate-debug>

    <div class="form-desc">
     This is required to encrypt and access your wallet.
    </div>
  </div>

  <div class="form-footer">
    <div></div>
    <vue-button
      btn-type="submit"
      btn-icon="angle-right"
      btn-icon-position="right"
      btn-value="Continue">
    </vue-button>
  </div>

</form>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, between, sameAs, minLength, email } from 'vuelidate/lib/validators'
import VueInput from '@nylira/vue-input'
import VueButton from '@nylira/vue-button'
import VuelidateDebug from './VuelidateDebug'
export default {
  name: 'fund-btc-01',
  components: {
    VueInput,
    VueButton,
    VuelidateDebug
  },
  computed: {
    amountBtc: {
      get () {
        return this.formData.atoms / 2000.00
      },
      set (newValue) {
        if (newValue === '.' || newValue === '' || newValue === ' ') {
          this.formData.atoms = 0
        } else {
          this.formData.atoms = newValue * 2000.00
        }
      }
    },
    ...mapGetters(['fundBtc'])
  },
  data () {
    return {
      formData: {
        atoms: 0,
        // email: 'peng@nylira.com',
        // confirmEmail: 'peng@nylira.com',
        // password: 'blowfish',
        // confirmPassword: 'blowfish'
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    nextStep () {
      this.$v.$touch()
      let data = this.formData
      if (this.$v.$error) {
        console.log('errors in the form, not going anywhere')
      } else {
        this.$store.commit('setFundBtcAtoms', data.atoms)
        this.$store.commit('setFundBtcEmail', data.email)
        this.$store.commit('setFundBtcHash', data.password)
        this.$store.commit('setFundBtcProgress', 2)
      }
    }
  },
  validations: {
    amountBtc: {
      required,
      between: between(0.01, 500)
    },
    formData: {
      atoms: {
        required,
        between: between(20, 1000000)
      },
      email: {
        required,
        email
      },
      confirmEmail: {
        required,
        sameAsEmail: sameAs('email')
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

<style lang="stylus">
@import '../styles/variables.styl'
</style>
