<template>
<form class="form" v-on:submit.prevent.default="nextStep">

  <div class="form-header">
    <div class="title">Step 2</div>
    <div class="subtitle">Confirm that you remember your password. If you've forgotten it, please start over.</div>
  </div>

  <div class="form-group" :class="{ 'form-group-error': $v.fields.password.$error }">
    <label for="fund-btc-recall-password">Password</label>
    <vue-input
      id="fund-btc-recall-password"
      type="password"
      placeholder="Enter your password"
      v-model="passwordValue"
      required
    >
    </vue-input>
    <form-msg name="Password" type="required" v-if="!$v.fields.password.required"></form-msg>
    <form-msg name="Password" v-if="!$v.fields.password.matchesHash"></form-msg>
    <vuelidate-debug name="fields.password" :data="$v.fields.password"></vuelidate-debug>
  </div>

  <div class="form-footer">
    <vue-button
      @click.native="startOver"
      icon="angle-left"
      value="Start Over">
    </vue-button>
    <vue-button
      type="submit"
      icon="angle-right"
      icon-pos="right"
      value="Continue">
    </vue-button>
  </div>

</form>
</template>

<script>
import bcrypt from 'bcryptjs'
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import FormMsg from './FormMsg'
import VueInput from '@nylira/vue-input'
import VueButton from '@nylira/vue-button'
import VuelidateDebug from './VuelidateDebug'
export default {
  name: 'fund-btc-02',
  components: {
    VueInput,
    VueButton,
    VuelidateDebug,
    FormMsg
  },
  computed: {
    ...mapGetters(['fundBtc'])
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
    startOver () {
      this.$store.commit('setFundBtcProgress', 1)
    },
    nextStep () {
      this.fields.password = this.passwordValue
      this.$v.$touch()
      if (this.$v.$error) {
        console.log('errors in the form, not going anywhere')
      } else {
        this.$store.commit('setFundBtcProgress', 3)
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
        matchesHash (value) {
          const hash = this.fundBtc.hash
          console.log('hash', this.fundBtc.hash)
          return bcrypt.compareSync(value, hash)
        }
      }
    }
  }
}
</script>
