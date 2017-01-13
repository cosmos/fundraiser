<template>
<form class="form form-narrow" v-on:submit.prevent.default="updateUser">
  <div class="form-header">
    <div class="subtitle">Edit your user settings here.</div>
    <vue-input-error :error="errorObj"></vue-input-error>
  </div>
  <div class="form-group">
    <label for="user-signup-email">Email</label>
    <input
      v-model="newEmail"
      type="email"
      id="user-settings-email"
      pattern=".{3,512}" required title="3 to 254 characters"
      required>
  </div>
  <div class="form-group">
    <label for="user-signup-password">New Password</label>
    <input
      v-model="newPassword"
      type="password"
      id="user-settings-password"
      placeholder="New Password"
      pattern=".{8,512}" required title="8 to 512 characters"
      required>
  </div>
  <div class="form-footer">
    <div></div>
    <vue-button btn-type="submit" btn-value="Update Settings"></vue-button>
  </div>
</form>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
import VueInputError from '@nylira/vue-input-error'
import VueButton from '@nylira/vue-button'
export default {
  name: 'pz-user-settings',
  components: {
    VueInputError,
    VueButton
  },
  computed: {
    newName: {
      get () {
        return this.$store.state.session.user.displayName
      },
      set (value) {
        this.$store.commit('setSessionUserDisplayName', value)
      }
    },
    newEmail: {
      get () {
        return this.$store.state.session.user.email
      },
      set (value) {
        this.$store.commit('setSessionUserEmail', value)
      }
    },
    ...mapGetters([
      'sessionUser'
    ])
  },
  data () {
    return {
      newPassword: '',
      errorObj: {
        active: false,
        code: '',
        message: ''
      }
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
    })
  }
}
</script>
