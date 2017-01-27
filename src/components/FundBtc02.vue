<template>
<form class="form" v-on:submit.prevent.default="nextStep">

  <div class="form-header">
    <div class="title">Step 2</div>
    <div class="subtitle">Confirm that you remember your password. If you've forgotten it, please start over.</div>
  </div>

  <div class="form-group">
    <label>Password</label>
    <div id="input-password-valid" class="input-group"
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
    <div class="form-error" v-if="!passwordEqualsHash">
      Password is incorrect
    </div>
    <vuelidate-debug name="formData.password" :data="$v.formData.password"></vuelidate-debug>
  </div>

  <div class="form-footer">
    <vue-button
      @click.native="startOver"
      btn-icon="angle-left"
      btn-value="Start Over">
    </vue-button>
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
import bcrypt from 'bcryptjs'
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import VueInput from '@nylira/vue-input'
import VueButton from '@nylira/vue-button'
import VuelidateDebug from './VuelidateDebug'

export default {
  name: 'fund-btc-02',
  components: {
    VueInput,
    VueButton,
    VuelidateDebug
  },
  computed: {
    ...mapGetters(['fundBtc'])
  },
  data () {
    return {
      passwordEqualsHash: true,
      formData: {
        password: ''
      }
    }
  },
  methods: {
    startOver () {
      this.$store.commit('setFundBtcProgress', 1)
    },
    equalsHash (plaintextPassword) {
      const hash = this.fundBtc.hash
      console.log('hash', this.fundBtc.hash)
      return bcrypt.compareSync(plaintextPassword, hash)
    },
    nextStep () {
      this.$v.$touch()
      let password = this.formData.password

      if (this.$v.$error) {
        console.log('password is required')
        return
      }

      if (!this.equalsHash(password)) {
        this.passwordEqualsHash = false
        document.querySelector('#input-password-valid')
          .classList.add('input-group-error')
        console.log('password doesnt match hash')
        return
      }

      document.querySelector('#input-password-valid')
        .classList.remove('input-group-error')
      console.log('password matches hash! YAY ----->')

      this.$store.commit('setFundBtcProgress', 3)
    }
  },
  validations: {
    formData: {
      password: {
        required
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'
</style>
