<template>
<form class="form" v-on:submit.prevent.default="nextStep">

  <div class="form-header">
    <div class="title">Pay with BTC</div>
    <div class="subtitle">Step 2 - Confirm that you remember your password. If you've forgotten it, please start over.</div>
  </div>

  <div class="form-group" :class="{ 'form-group-error': $v.fields.password.$error }">
    <label for="fund-btc-recall-password">Password</label>
    <field
      id="fund-btc-recall-password"
      type="password"
      placeholder="Enter your password"
      v-model="passwordValue"
      required
    >
    </field>
    <form-msg name="Password" type="required" v-if="!$v.fields.password.required"></form-msg>
    <form-msg name="Password" v-if="!$v.fields.password.matchesHash"></form-msg>
    <vuelidate-debug name="fields.password" :data="$v.fields.password"></vuelidate-debug>
  </div>

  <div class="form-footer">
    <btn
      @click.native="startOver"
      icon="angle-left"
      value="Start Over">
    </btn>
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
import bcrypt from 'bcryptjs'
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import FormMsg from '@nylira/vue-form-msg'
import Field from '@nylira/vue-input'
import Btn from '@nylira/vue-button'
import VuelidateDebug from './VuelidateDebug'
export default {
  name: 'fund-btc-02',
  components: {
    Field,
    Btn,
    VuelidateDebug,
    FormMsg
  },
  computed: {
    ...mapGetters(['btcTransaction'])
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
      this.$store.commit('setBtcTransactionProgress', 1)
    },
    nextStep () {
      this.fields.password = this.passwordValue
      this.$v.$touch()
      if (this.$v.$error) {
        console.log('errors in the form, not going anywhere')
      } else {
        this.$store.commit('setBtcTransactionProgress', 3)
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
          const hash = this.btcTransaction.hash
          console.log('hash', this.btcTransaction.hash)
          return bcrypt.compareSync(value, hash)
        }
      }
    }
  }
}
</script>
