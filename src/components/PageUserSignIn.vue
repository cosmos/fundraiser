<template>
  <div class="page-user ni-forms">
    <form-struct :submit="validateSignIn">
      <div slot="title">Sign In</div>
      <form-group :class="{ error: $v.fields.email.$error }">
        <label for="user-signin-email">Email</label>
        <field
          id="user-signin-email"
          v-model="fields.email"
          type="email"
          placeholder="name@example.com">
        </field>
        <form-msg name="Email" type="required" v-if="!$v.fields.email.required"></form-msg>
        <form-msg name="Email" type="valid" v-if="!$v.fields.email.email"></form-msg>
      </form-group>
      <form-group :class="{ error: $v.fields.password.$error }">
        <label for="user-signin-password">Password</label>
        <field
          id="user-signin-password"
          v-model="fields.password"
          type="password"
          placeholder="Password">
        </field>
        <form-msg name="Password" type="required" v-if="!$v.fields.password.required"></form-msg>
        <form-msg name="Password" type="length" min="8" max="1024" v-if="!$v.fields.password.minLength || !$v.fields.password.maxLength"></form-msg>
      </form-group>
      <router-link slot="reset" to="/reset">Forgot password?</router-link>
      <btn slot="submit" type="submit" value="Sign In"></btn>
    </form-struct>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import Field from '@nylira/vue-input'
import FieldGroup from './FieldGroup'
import FormGroup from './FormGroup'
import FormMsg from '@nylira/vue-form-msg'
import FormStruct from './FormStruct'
import Btn from '@nylira/vue-button'
export default {
  name: 'page-user-signin',
  components: {
    Field,
    FieldGroup,
    FormGroup,
    FormMsg,
    FormStruct,
    Btn
  },
  computed: {
    ...mapGetters(['sessionRequest', 'sessionUser'])
  },
  data () {
    return {
      fields: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    validateSignIn () {
      this.$v.$touch()
      if (!this.$v.$error) this.signIn()
    },
    signIn () {
      this.$store.dispatch('signIn', {
        user: this.fields,
        router: this.$router
      })
    }
  },
  mounted () {
    document.querySelector('#user-signin-email').focus()
    if (this.sessionUser.signedIn) {
      this.fields.email = this.sessionUser.email
      document.querySelector('#user-signin-password').focus()
    }
  },
  validations: {
    fields: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(1024)
      }
    }
  }
}
</script>
