<template>
<div class="page page-user-settings">
  <vue-page-header :title="sessionUser.displayName" subtitle="User Profile Settings" type="center"></vue-page-header>
  <form class="form form-narrow" v-on:submit.prevent.default="validateUpdateUser">
    <div class="form-header">
      <div class="subtitle">Edit your user settings here.</div>
      <div class="subtitle subtitle-err" v-if="err.active">
        {{ err.code }} - {{ err.msg }}
      </div>
    </div>

    <div class="form-group" :class="{ 'form-group-error': $v.fields.newDisplayName.$error }">
      <label for="user-settings-name">Change Display Name</label>
      <vue-input
        v-model="fields.newDisplayName"
        input-type="text"
        id="user-settings-name"
      >
      </vue-input>
      <form-msg name="Display Name" type="required" v-if="!$v.fields.newDisplayName.required"></form-msg>
      <form-msg name="Display Name" type="length" min="2" max="20" v-if="!$v.fields.newDisplayName.menLength || !$v.fields.newDisplayName.maxLength"></form-msg>
    </div>

    <div class="form-group" :class="{ 'form-group-error': $v.fields.newEmail.$error }">
      <label for="user-settings-email">Change Email</label>
        <vue-input
          v-model="fields.newEmail"
          input-type="email"
          id="user-settings-email"
        >
        </vue-input>
        <form-msg name="Email" type="required" v-if="!$v.fields.newEmail.required"></form-msg>
        <form-msg name="Email" type="valid" v-if="!$v.fields.newEmail.email"></form-msg>
    </div>

    <div class="form-group" :class="{ 'form-group-error': $v.fields.newPassword.$error }">
      <label for="user-settings-password">Change Password</label>
      <vue-input
        v-model="fields.newPassword"
        input-type="password"
        id="user-settings-password"
        input-placeholder="New Password"
      >
      </vue-input>
      <form-msg name="Password" type="length" min="8" max="1024" v-if="!$v.fields.newPassword.minLength || !$v.fields.newPassword.maxLength"></form-msg>
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
    ...mapGetters(['sessionUser'])
  },
  data () {
    return {
      fields: {
        newDisplayName: '',
        newEmail: '',
        newPassword: ''
      },
      err: {
        active: false,
        code: '',
        msg: ''
      }
    }
  },
  methods: {
    setError (code, msg) {
      if (code === 'auth/requires-recent-login') { this.$router.push('/signin') }
      this.err = {
        active: true,
        code: code,
        msg: msg
      }
    },
    validateUpdateUser () {
      this.$v.$touch()
      if (this.$v.$error) return
      else this.updateUser()
    },
    updateUser () {
      let newDisplayName = this.fields.newDisplayName
      let newEmail = this.fields.newEmail
      let newPassword = this.fields.newPassword

      let user = firebase.auth().currentUser
      let oldName = user.displayName
      let oldEmail = user.email

      if (newDisplayName !== oldName) { this.updateName(newDisplayName) }
      if (newEmail !== oldEmail) { this.updateEmail(newEmail) }
      if (newPassword) { this.updatePassword(newPassword) }
    },
    updateName (name) {
      let user = firebase.auth().currentUser
      let setError = this.setError
      user.updateProfile({
        displayName: name
      }).then(function () {
        console.log('update username successful', name)
      }, function (error) {
        console.log('update username failed', error)
        setError(error.code, error.message)
      })
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
      console.log('auth state changed!', user)
      self.fields.newDisplayName = user.displayName
      self.fields.newEmail = user.email
    })
  },
  validations: {
    fields: {
      newDisplayName: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(20)
      },
      newEmail: {
        required,
        email
      },
      newPassword: {
        minLength: minLength(8),
        maxLength: maxLength(1024)
      }
    }
  }
}
</script>
