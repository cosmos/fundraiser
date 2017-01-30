<template>
<div class="page page-user-settings">
  <vue-page-header :title="sessionUser.displayName" type="center"></vue-page-header>
  <form class="form form-narrow" v-on:submit.prevent.default="validateUpdateUser">
    <div class="form-header">
      <div class="subtitle">Edit your user settings here.</div>
    </div>
    <div class="form-group">
      <label for="user-settings-email">Email</label>
        <vue-input
          v-model="newEmail"
          input-type="email"
          id="user-settings-email"
          input-placeholder="name@example.com"
        >
        </vue-input>
        <form-msg name="Email" type="required" v-if="!$v.newEmail.required"></form-msg>
        <form-msg name="Email" type="valid" v-if="!$v.newEmail.email"></form-msg>
    </div>
    <div class="form-group">
      <label for="user-settings-password">New Password</label>
      <vue-input
        v-model="newPassword"
        input-type="password"
        id="user-settings-password"
        input-placeholder="New Password"
      >
      </vue-input>
      <form-msg name="Password" type="required" v-if="!$v.newPassword.required"></form-msg>
      <form-msg name="Password" type="length" min="8" max="1024" v-if="!$v.newPassword.minLength || !$v.newPassword.maxLength"></form-msg>
    </div>
    <div class="form-footer">
      <div></div>
      <vue-button btn-type="submit" btn-value="Update Settings"></vue-button>
    </div>
  </form>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import VuePageHeader from '@nylira/vue-page-header'
import VueButton from '@nylira/vue-button'
import VueInput from '@nylira/vue-input'
import FormMsg from './FormMsg'
import firebase from 'firebase'
export default {
  name: 'page-user-settings',
  components: {
    VuePageHeader,
    VueButton,
    VueInput,
    FormMsg
  },
  computed: {
    newEmail: {
      get () {
        if (this.sessionUser) {
          return this.sessionUser.email
        }
        return ''
      },
      set (value) {
        this.$store.commit('setSessionUserEmail', value)
      }
    },
    ...mapGetters(['sessionUser'])
  },
  data () {
    return {
      newPassword: ''
    }
  },
  methods: {
    setError (code, msg) {
      if (code === 'auth/requires-recent-login') { this.$router.push('/signin') }

      this.errorObj = {
        active: true,
        code: code,
        message: msg
      }
    },
    validateUpdateUser () {
      this.$v.$touch()
      if (this.$v.$error) return
      else this.updateUser()
    },
    updateUser () {
      // let newName = this.newName
      let newEmail = this.newEmail
      let newPassword = this.newPassword

      let user = firebase.auth().currentUser
      // let oldName = user.displayName
      let oldEmail = user.email

      // if (newName !== oldName) { this.updateName(newName) }
      if (newEmail !== oldEmail) { this.updateEmail(newEmail) }
      if (newPassword) { this.updatePassword(newPassword) }
    },
    updatePassword (password) {
      let user = firebase.auth().currentUser
      let setError = this.setError
      user.updatePassword(password).then(function () {
        console.log('update password successful', password)
      }, function (error) {
        console.log('update password failed', error)
        setError(error.code, error.message)
      })
    },
    updateEmail (email) {
      let user = firebase.auth().currentUser
      let setError = this.setError
      user.updateEmail(email).then(function () {
        console.log('update email successful', email)
      }, function (error) {
        console.log('update email failed', error)
        setError(error.code, error.message)
      })
    }
  },
  mounted () {
    let self = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        self.$store.commit('setSessionRequest', '/settings')
        self.$router.push('/signin')
      }
      self.user = user
      console.log(self.user)
    })
  },
  validations: {
    newEmail: {
      required,
      email
    },
    newPassword: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(1024)
    }
  }
}
</script>
