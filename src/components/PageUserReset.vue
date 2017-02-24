<template>
<div class="page-user">
  <page-header title="Reset Password" type="center"></page-header>
  <form class="form form-narrow" v-on:submit.prevent.default="validateReset">
    <div class="form-group" :class="{ 'form-group-error': $v.fields.email.$error }">
      <label for="user-reset-email">Email</label>
      <field
        id="user-reset-email"
        v-model="fields.email"
        type="email"
        placeholder="name@example.com"
      >
      </field>
      <form-msg name="Email" type="required" v-if="!$v.fields.email.required"></form-msg>
      <form-msg name="Email" type="valid" v-if="!$v.fields.email.email"></form-msg>
    </div>
    <div class="form-footer">
      <div></div>
      <btn type="submit" value="Reset Password"></btn>
    </div>
  </form>
</div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import PageHeader from '@nylira/vue-page-header'
import Btn from '@nylira/vue-button'
import Field from '@nylira/vue-input'
import FormMsg from '@nylira/vue-form-msg'
export default {
  name: 'page-user-reset',
  components: {
    PageHeader,
    Btn,
    Field,
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
      if (!this.$v.$error) this.resetPassword()
    },
    resetPassword () {
      this.$store.commit('sendPasswordResetEmail', this.fields.email)
      this.$store.commit('notifyCustom', { title: 'Password Reset', body: 'Check your email to reset and create a new password.' })
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
