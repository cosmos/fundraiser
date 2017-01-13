<template>
<div class="page">
  <page-header title="Sign Up" type="center">
  </page-header>
  <form class="form form-narrow" v-on:submit.prevent.default="signUp">
    <div class="form-header">
      <div class="subtitle">Signing up enables commenting and gives you a head start on the fundraising event.</div>
      <vue-input-error :error="errorObj"></vue-input-error>
    </div>
    <div class="form-group">
      <label for="user-signup-name">Name</label>
      <input
        v-model="user.displayName"
        type="text"
        id="user-signup-name"
        placeholder="Display Name"
        pattern=".{2,32}" required title="2 to 32 characters"
        required>
    </div>
    <div class="form-group">
      <label for="user-signup-email">Email</label>
      <input
        v-model="user.email"
        type="email"
        id="user-signup-email"
        placeholder="name@example.com"
        pattern=".{3,512}" required title="3 to 254 characters"
        required>
    </div>
    <div class="form-group">
      <label for="user-signup-password">Password</label>
      <input
        v-model="user.password"
        type="password"
        id="user-signup-password"
        placeholder="Password"
        pattern=".{8,512}" required title="8 to 512 characters"
        required>
    </div>
    <div class="form-footer">
      <router-link to="/signin">Have an account?</router-link>
      <vue-button btn-type="submit" btn-value="Sign Up"></vue-button>
    </div>
  </form>
</div>
</template>

<script>
import PageHeader from './PageHeader'
import firebase from 'firebase'
import { mapGetters } from 'vuex'
import VueInputError from '@nylira/vue-input-error'
import VueButton from '@nylira/vue-button'
export default {
  name: 'page-blog-index',
  components: {
    PageHeader,
    VueInputError,
    VueButton
  },
  computed: {
    ...mapGetters(['sessionRequest'])
  },
  data () {
    return {
      user: {
        displayName: '',
        email: '',
        password: ''
      },
      errorObj: {
        active: false,
        code: '',
        message: ''
      }
    }
  },
  methods: {
    signUp (event) {
      if (!event.target.checkValidity()) {
        this.validateFields(event)
      } else {
        this.createUser()
      }
    },
    validateFields (event) {
      // console.log('I am Safari!')
      event.preventDefault()

      let inputs = document.querySelectorAll(
        'input[required],select[required], textarea[required]'
      )

      for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i]
        if (!input.validity.valid) {
          let msg
          if (input.id === 'user-signup-name') {
            msg = 'User name is required (2-32 characters)'
          }
          if (input.id === 'user-signup-email') {
            msg = 'Email must be valid'
          }
          if (input.id === 'user-signup-password') {
            msg = 'Password is required (8-512 characters)'
          }
          console.log(input.id, 'is invalid')

          input.focus()
          input.placeholder = msg
          input.value = ''
          return
        }
      }
    },
    createUser () {
      let self = this
      firebase.auth().createUserWithEmailAndPassword(
      this.user.email, this.user.password)
        .catch(function (error) {
          let errorCode = error.code
          let errorMessage = error.message
          console.log(errorCode, errorMessage)
          self.errorObj.active = true
          self.errorObj.code = errorCode
          self.errorObj.message = errorMessage
        })

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          user.updateProfile({
            displayName: self.user.displayName
          }).then(function () {
            self.$store.commit('setSessionUserDisplayName', self.user.displayName)
          }, function (error) {
            console.log('error', error)
          })
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
        self.$store.commit('setSessionUserDisplayName', user.displayName)
        self.$store.commit('setSessionUserEmail', user.email)
        self.$store.commit('setSessionUserPhotoUrl', user.photoUrl)
        self.$store.commit('setSessionUserUid', user.uid)
        console.log('signed in:', user.email)
      } else {
        self.$store.commit('clearSessionUser')
        console.log('signed out')
      }
    })
  }
}
</script>
