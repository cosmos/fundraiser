<template>
<div class="page-user-signup">
  <vue-page-header title="Sign Up" type="center"></vue-page-header>
  <form class="form form-narrow" v-on:submit.prevent.default="validateSignUp">
    <div class="form-group" :class="{ 'form-group-error': $v.fields.email.$error }">
      <label for="user-signup-name">Name</label>
      <vue-input
        id="user-signup-name"
        v-model="fields.displayName"
        type="text"
        placeholder="Display Name"
      >
      </vue-input>
      <form-msg name="Display Name" type="required" v-if="!$v.fields.displayName.required"></form-msg>
      <form-msg name="Display Name" type="length" min="2" max="20" v-if="!$v.fields.displayName.menLength || !$v.fields.displayName.maxLength"></form-msg>
    </div><!--form-group-->

    <div class="form-group" :class="{ 'form-group-error': $v.fields.email.$error }">
      <label for="user-signup-email">Email</label>
      <vue-input
        id="user-signup-email"
        v-model="fields.email"
        type="email"
        placeholder="name@example.com"
      >
      </vue-input>
      <form-msg name="Email" type="required" v-if="!$v.fields.email.required"></form-msg>
      <form-msg name="Email" type="valid" v-if="!$v.fields.email.email"></form-msg>
    </div><!--form-group-->

    <div class="form-group" :class="{ 'form-group-error': $v.fields.email.$error }">
      <label for="user-signup-password">Password</label>
      <vue-input
        id="user-signup-password"
        v-model="fields.password"
        type="password"
        placeholder="Password"
      >
      </vue-input>
      <form-msg name="Password" type="required" v-if="!$v.fields.password.required"></form-msg>
      <form-msg name="Password" type="length" min="8" max="1024" v-if="!$v.fields.password.minLength || !$v.fields.password.maxLength"></form-msg>
    </div><!--form-group-->

    <div class="form-footer">
      <router-link to="/signin">Have an account?</router-link>
      <vue-button type="submit" value="Sign Up"></vue-button>
    </div>
  </form>
</div>
</template>

<script>
import firebase from 'firebase'
import { mapGetters } from 'vuex'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
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
  computed: {
    ...mapGetters(['sessionRequest'])
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
      if (this.$v.$error) return
      else this.signUp()
    },
    signUp () {
      let self = this
      firebase.auth().createUserWithEmailAndPassword(this.fields.email, this.fields.password)
        .catch(function (error) {
          self.$store.commit('notifyError', { title: error.code, body: error.message })
        })

      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          user.updateProfile({
            displayName: self.fields.displayName
          }).then(function () {
            self.$store.commit('setSessionUserDisplayName', self.fields.displayName)
            self.$store.commit('setSessionUserEmail', user.email)
            self.$store.commit('setSessionUserPhotoUrl', user.photoUrl)
            self.$store.commit('setSessionUserUid', user.uid)
          }, function (error) {
            console.log('error', error)
          })
          self.signInSuccess()
        }
      })
    },
    signInSuccess () {
      this.$store.commit('notifySignUp')
      if (this.sessionRequest) {
        this.$router.push(this.sessionRequest)
        this.$store.commit('setSessionRequest', '')
      } else {
        this.$router.push('/')
      }
    }
  },
  beforeMount () {
    let self = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.$router.replace('/settings')
      }
    })
  },
  mounted () {
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

<style lang="stylus">
@import '../styles/variables.styl'
.page-user-signup .pz-page-header
  border-bottom none
</style>
