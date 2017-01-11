<template>
<div class="page">
  <page-header title="Sign In"></page-header></page-header>
  <form class="form form-narrow" v-on:submit.prevent.default="signIn">
    <div class="form-header">
      <div class="subtitle">Sign in to your account now.</div>
      <form-error :form-error="formError"></form-error>
    </div>
    <div class="form-group">
      <label for="user-signin-email">Email</label>
      <input
        v-model="email"
        type="email"
        id="user-signin-email"
        placeholder="name@example.com"
        pattern=".{3,512}" required title="3 to 254 characters"
        required>
    </div>
    <div class="form-group">
      <label for="user-signin-password">Password</label>
      <input
        v-model="password"
        type="password"
        id="user-signin-password"
        placeholder="Password"
        pattern=".{8,512}" required title="8 to 512 characters"
        required>
    </div>
    <div class="form-footer">
      <router-link to="/reset">Forgot password?</router-link>
      <pz-button btn-type="submit" btn-value="Sign In"></pz-button>
    </div>
  </form>
</div>
</template>

<script>
import PageHeader from './PageHeader'
import firebase from 'firebase'
import FormError from './FormError'
import { mapGetters } from 'vuex'
import PzButton from './PzButton'
export default {
  name: 'page-blog-index',
  components: {
    PageHeader,
    FormError,
    PzButton
  },
  computed: {
    ...mapGetters(['sessionRequest'])
  },
  data () {
    return {
      email: '',
      password: '',
      formError: {
        active: false,
        code: '',
        message: ''
      }
    }
  },
  methods: {
    signIn () {
      let self = this
      let email = this.email
      let password = this.password
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function (error) {
          var errorCode = error.code
          var errorMessage = error.message
          console.log(errorCode, errorMessage)

          self.formError.active = true
          self.formError.code = errorCode
          self.formError.message = errorMessage
        })

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          self.signInSuccess()
        }
      })
    },
    signInSuccess () {
      if (this.sessionRequest) {
        this.$router.push(this.sessionRequest)
        this.$store.commit('setSessionRequest', '')
      } else {
        this.$router.push('/')
      }
    }
  },
  mounted () {
    let self = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.email = user.email
      }
    })
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'
</style>
