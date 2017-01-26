<template>
<div class="page page-fund">
  <vue-page-header :title="$t('siteFund.titleBtc')" type="center"></vue-page-header>
  <form class="form" v-on:submit.prevent.default="continuePayment">
    <div class="step">
      <div class="step-title">Step 1</div>
      <div class="form-group">
        <label>Enter amount to purchase in either Bitcoin or Atoms.</label>
        <div class="input-group"
          :class="{ 'input-group-error': $v.amountBtc.$error }">
          <vue-input
            input-type="number"
            v-model="amountBtc"
            @input="$v.amountBtc.$touch()"
            min="0.1"
            max="500"
            step="0.1"
            required
          >
          </vue-input>
          <div class="input-group-addon">BTC</div>
        </div>
        <div class="input-group"
          :class="{ 'input-group-error': $v.fund.amountAtoms.$error }">
          <vue-input
            input-type="number"
            v-model="fund.amountAtoms"
            @input="$v.fund.amountAtoms.$touch()"
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
        <div class="form-error" v-if="!$v.fund.amountAtoms.required">
          Atom amount is required
        </div>
        <div class="form-error" v-if="!$v.fund.amountAtoms.between">
          Atom amount must be between 20 and 1,000,000
        </div>
        <div class="form-desc">
          Price: 1 BTC buys 2,000 Atoms.
        </div>
        <vuelidate-debug name="amountBtc" :data="$v.amountBtc"></vuelidate-debug>
        <vuelidate-debug name="amountAtoms" :data="$v.fund.amountAtoms"></vuelidate-debug>
      </div><!--form-group-->
    </div><!--step-->

    <div class="step">
      <div class="step-title">Step 2</div>
      <div class="form-group">

        <label>Enter a valid email address. Your wallet backup will be emailed to this address.</label>
        <div class="input-group"
          :class="{ 'input-group-error': $v.fund.email.$error }">
          <vue-input
            input-type="email"
            input-placeholder="Enter your email"
            v-model="fund.email"
            @input="$v.fund.email.$touch()"
            required
          >
          </vue-input>
        </div>

        <div class="form-error" v-if="!$v.fund.email.required">
          Email is required
        </div>
        <div class="form-error" v-if="!$v.fund.email.email">
          Email must be valid
        </div>
        <vuelidate-debug name="fund.email" :data="$v.fund.email"></vuelidate-debug>

        <div class="input-group"
          :class="{ 'input-group-error': $v.fund.confirmEmail.$error }">
          <vue-input
            input-type="email"
            input-placeholder="Re-enter your email"
            v-model="fund.confirmEmail"
            @input="$v.fund.confirmEmail.$touch()"
            required
          >
          </vue-input>
        </div>

        <div class="form-error" v-if="!$v.fund.confirmEmail.required">
          Email confirmation is required
        </div>
        <div class="form-error" v-if="!$v.fund.confirmEmail.sameAsEmail">
          Emails must be identical
        </div>
        <vuelidate-debug name="fund.confirmEmail" :data="$v.fund.confirmEmail"></vuelidate-debug>

      </div><!--form-group-->
    </div><!--step-->

    <div class="step">
      <div class="step-title">Step 3</div>
      <div class="form-group">
        <label>Enter a password. This is required to encrypt and access your wallet.</label>
        <div class="input-group"
          :class="{ 'input-group-error': $v.fund.password.$error }">
          <vue-input
            input-type="password"
            input-placeholder="Enter your password"
            v-model="fund.password"
            @input="$v.fund.password.$touch()"
            required
          >
          </vue-input>
        </div>

        <div class="form-error" v-if="!$v.fund.password.required">
          Password is required
        </div>
        <div class="form-error" v-if="!$v.fund.password.minLength">
          Password must be at least 14 characters
        </div>
        <vuelidate-debug name="fund.password" :data="$v.fund.email"></vuelidate-debug>

        <div class="input-group"
          :class="{ 'input-group-error': $v.fund.confirmPassword.$error }">
          <vue-input
            input-type="password"
            input-placeholder="Re-enter your password"
            v-model="fund.confirmPassword"
            @input="$v.fund.confirmPassword.$touch()"
            required
          >
          </vue-input>
        </div>

        <div class="form-error" v-if="!$v.fund.confirmPassword.required">
          Password confirmation is required
        </div>
        <div class="form-error" v-if="!$v.fund.confirmPassword.sameAsPassword">
          Passwords must be identical
        </div>
        <vuelidate-debug name="fund.confirmPassword" :data="$v.fund.confirmPassword"></vuelidate-debug>
      </div>
    </div>
    <div class="step">
      <vue-button btn-type="submit" btn-size="large" btn-value="Continue"></vue-button>
    </div>
  </form>
</div>
</template>

<script>
import { required, between, sameAs, minLength, email } from 'vuelidate/lib/validators'
import VuePageHeader from '@nylira/vue-page-header'
import VueInput from '@nylira/vue-input'
import VueButton from '@nylira/vue-button'
import VuelidateDebug from './VuelidateDebug'
export default {
  name: 'page-fund',
  components: {
    VuePageHeader,
    VueInput,
    VueButton,
    VuelidateDebug
  },
  computed: {
    amountBtc: {
      get () {
        return this.fund.amountAtoms / 2000.00
      },
      set (newValue) {
        if (newValue === '.' || newValue === '' || newValue === ' ') {
          this.fund.amountAtoms = 0
        } else {
          this.fund.amountAtoms = newValue * 2000.00
        }
      }
    }
  },
  data () {
    return {
      fund: {
        amountAtoms: 1000,
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    continuePayment () {
      window.alert('TODO: Next Step')
    }
  },
  mounted () {
    document.title = this.$t('siteFund.titleBtc') + ' - Cosmos'
    let highlights = document.querySelectorAll('.highlight-on-focus')
    Array.from(highlights).map(function (el) {
      el.addEventListener('click', function () { this.select() })
    })
  },
  validations: {
    amountBtc: {
      required,
      between: between(0.01, 500)
    },
    fund: {
      amountAtoms: {
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
        minLength: minLength(14)
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

.page-fund .pz-page-header
  border-bottom none

.form
  max-width 40rem
  margin 0 auto
  .form-group
    label
      margin-bottom 1rem

  .input-group
    margin-bottom 0.5rem

.step
  border-bottom 1px solid bc
  padding 0.5rem 0
  .step-title
    font-weight bold
    padding 0 1rem
</style>
