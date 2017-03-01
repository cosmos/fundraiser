<template>
  <div class="page-user ni-forms">
    <form-struct :submit="validateReset">
      <div slot="title">Reset Password</div>
      <form-group :class="{ error: $v.fields.email.$error }">
        <label for="user-reset-email">Email</label>
        <field
          id="user-reset-email"
          v-model="fields.email"
          type="email"
          placeholder="name@example.com">
        </field>
        <form-msg name="Email" type="required" v-if="!$v.fields.email.required"></form-msg>
        <form-msg name="Email" type="valid" v-if="!$v.fields.email.email"></form-msg>
      </form-group>
      <btn slot="submit" type="submit" value="Reset Password"></btn>
    </form-struct>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import PageHeader from '@nylira/vue-page-header'
import Field from '@nylira/vue-input'
import FieldGroup from './FieldGroup'
import FormGroup from './FormGroup'
import FormMsg from '@nylira/vue-form-msg'
import FormStruct from './FormStruct'
import Btn from '@nylira/vue-button'
export default {
  name: 'page-user-reset',
  components: {
    PageHeader,
    Field,
    FieldGroup,
    FormGroup,
    FormMsg,
    FormStruct,
    Btn
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
