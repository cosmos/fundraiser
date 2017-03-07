<template>
  <div class="page-user ni-forms">
    <form-struct :submit="validateSignUp">
      <div slot="title">Sign Up</div>
      <form-group :class="{ error: $v.fields.email.$error }">
        <label for="user-signup-name">Name</label>
        <field
          id="user-signup-name"
          v-model="fields.displayName"
          type="text"
          placeholder="Display Name">
        </field>
        <form-msg name="Display Name" type="required" v-if="!$v.fields.displayName.required"></form-msg>
        <form-msg name="Display Name" type="length" min="2" max="20" v-if="!$v.fields.displayName.menLength || !$v.fields.displayName.maxLength"></form-msg>
      </form-group>
      <form-group :class="{ error: $v.fields.email.$error }">
        <label for="user-signup-email">Email</label>
        <field
          id="user-signup-email"
          v-model="fields.email"
          type="email"
          placeholder="name@example.com">
        </field>
        <form-msg name="Email" type="required" v-if="!$v.fields.email.required"></form-msg>
        <form-msg name="Email" type="valid" v-if="!$v.fields.email.email"></form-msg>
      </form-group>
      <form-group :class="{ error: $v.fields.password.$error }">
        <label for="user-signup-password">Password</label>
        <field
          id="user-signup-password"
          v-model="fields.password"
          type="password"
          placeholder="Password">
        </field>
        <form-msg name="Password" type="required" v-if="!$v.fields.password.required"></form-msg>
        <form-msg name="Password" type="length" min="8" max="1024" v-if="!$v.fields.password.minLength || !$v.fields.password.maxLength"></form-msg>
      </form-group>
      <router-link slot="reset" to="/signin">Have an account?</router-link>
      <btn slot="submit" type="submit" value="Sign Up"></btn>
    </form>
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
  name: 'page-user-signup',
  components: {
    Field,
    FieldGroup,
    FormGroup,
    FormMsg,
    FormStruct,
    Btn
  },
  computed: {
    ...mapGetters(['sessionUser', 'sessionRequest'])
  },
  data () {
    return {
      fields: {
        displayName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    validateSignUp () {
      this.$v.$touch()
      if (!this.$v.$error) this.signUp()
    },
    signUp () {
      this.$store.dispatch('signUp', {
        user: this.fields,
        router: this.$router
      })
    }
  },
  mounted () {
    if (this.sessionUser.signedIn) {
      this.$router.replace('/settings')
    }
    document.querySelector('#user-signup-name').focus()
  },
  validations: {
    fields: {
      displayName: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(20)
      },
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
