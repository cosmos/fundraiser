<template>
<div class="page-user-reset">
  <vue-page-header title="Reset Password" type="center"></vue-page-header>
  <form class="form form-narrow" v-on:submit.prevent.default="validateReset">
    <div class="form-group" :class="{ 'form-group-error': $v.fields.email.$error }">
      <label for="user-reset-email">Email</label>
      <vue-input
        id="user-reset-email"
        v-model="fields.email"
        type="email"
        placeholder="name@example.com"
      >
      </vue-input>
      <form-msg name="Email" type="required" v-if="!$v.fields.email.required"></form-msg>
      <form-msg name="Email" type="valid" v-if="!$v.fields.email.email"></form-msg>
    </div>
    <div class="form-footer">
      <div></div>
      <vue-button btn-type="submit" btn-value="Reset Password"></vue-button>
    </div>
  </form>
</div>
</template>

<script>
import firebase from 'firebase'
import { required, email } from 'vuelidate/lib/validators'
import VuePageHeader from '@nylira/vue-page-header'
import VueButton from '@nylira/vue-button'
import VueInput from '@nylira/vue-input'
import FormMsg from './FormMsg'
export default {
  name: 'page-blog-index',
  components: {
    VuePageHeader,
    VueButton,
    VueInput,
    FormMsg
  },
  data () {
    return {
      fields: {
        email: ''
      }
    }
  },
  methods: {
    validateReset () {
      this.$v.$touch()
      if (this.$v.$error) return
      else this.resetPassword()
    },
    resetPassword () {
      let self = this
      firebase.auth().sendPasswordResetEmail(this.fields.email).then(function () {
        self.$store.commit('notifyCustom', { title: 'Password Reset', body: 'Check your email to reset and create a new password.' })
      }, function (error) {
        self.$store.commit('notifyError', { title: error.code, body: error.message })
      })
      this.$router.push('/')
    }
  },
  mounted () {
    document.querySelector('#user-reset-email').focus()
  },
  validations: {
    fields: {
      email: {
        required,
        email
      }
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'
.page-user-reset .pz-page-header
  border-bottom none
</style>
