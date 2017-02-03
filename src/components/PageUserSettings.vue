<template>
<div class="page-user-settings">
  <vue-page-header title="User Settings" type="center"></vue-page-header>
  <form class="form form-narrow" v-on:submit.prevent.default="validateUpdateUser">
    <div class="form-header">
      <div class="subtitle">Edit your personal profile here.</div>
    </div>

    <div class="form-group" :class="{ 'form-group-error': $v.fields.newDisplayName.$error }">
      <label for="user-settings-name">Change Display Name</label>
      <vue-input
        v-model="fields.newDisplayName"
        type="text"
        id="user-settings-name"
        placeholder="New Display Name"
      >
      </vue-input>
      <form-msg name="Display Name" type="required" v-if="!$v.fields.newDisplayName.required"></form-msg>
      <form-msg name="Display Name" type="length" min="2" max="20" v-if="!$v.fields.newDisplayName.menLength || !$v.fields.newDisplayName.maxLength"></form-msg>
    </div>

    <div class="form-group" :class="{ 'form-group-error': $v.fields.newEmail.$error }">
      <label for="user-settings-email">Change Email</label>
      <vue-input
        v-model="fields.newEmail"
        type="email"
        id="user-settings-email"
        placeholder="New Email"
      >
      </vue-input>
      <form-msg name="Email" type="required" v-if="!$v.fields.newEmail.required"></form-msg>
      <form-msg name="Email" type="valid" v-if="!$v.fields.newEmail.email"></form-msg>
    </div>

    <div class="form-group" :class="{ 'form-group-error': $v.fields.newPassword.$error }">
      <label for="user-settings-password">Change Password</label>
      <vue-input
        v-model="fields.newPassword"
        type="password"
        id="user-settings-password"
        placeholder="New Password"
      >
      </vue-input>
      <form-msg name="Password" type="length" min="8" max="1024" v-if="!$v.fields.newPassword.minLength || !$v.fields.newPassword.maxLength"></form-msg>
    </div>

    <div class="form-footer">
      <div></div>
      <vue-button type="submit" value="Save Changes"></vue-button>
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
    pageTitle () {
      if (this.sessionUser.displayName) {
        return this.sessionUser.displayName
      }
      return 'Loading...'
    },
    ...mapGetters(['sessionUser'])
  },
  data () {
    return {
      fields: {
        newDisplayName: '',
        newEmail: '',
        newPassword: ''
      }
    }
  },
  methods: {
    catch (error) {
      if (error.code === 'auth/requires-recent-login') this.$router.push('/signin')
      this.$store.commit('notifyError', { title: error.code, body: error.message })
    },
    validateUpdateUser () {
      this.$v.$touch()
      if (this.$v.$error) return
      else this.updateUser()
    },
    updateUser () {
      let changes = 0
      let newDisplayName = this.fields.newDisplayName
      let newEmail = this.fields.newEmail
      let newPassword = this.fields.newPassword

      let user = firebase.auth().currentUser
      let oldDisplayName = user.displayName
      let oldEmail = user.email

      if (newDisplayName !== oldDisplayName) {
        this.updateName(newDisplayName)
        changes++
      }
      if (newEmail !== oldEmail) {
        this.updateEmail(newEmail)
        changes++
      }
      if (newPassword) {
        this.updatePassword(newPassword)
        changes++
      }

      if (changes === 0) {
        this.$store.commit('notifyWarn', { title: 'Nothing Changed', body: `You made no changes to your user profile settings.` })
      }
    },
    updateName (name) {
      let self = this
      let user = firebase.auth().currentUser
      user.updateProfile({
        displayName: name
      }).then(function () {
        self.$store.commit('notifyCustom', { title: 'Display Name Updated', body: `Your display name has been succesfully changed to "${name}".` })
        self.$store.commit('setSessionUserDisplayName', name)
      }, function (error) {
        self.catch(error)
      })
    },
    updatePassword (password) {
      let self = this
      let user = firebase.auth().currentUser
      user.updatePassword(password).then(function () {
        self.$store.commit('notifyCustom', { title: 'Password Updated', body: `Your password has been successfully updated.` })
      }, function (error) {
        self.catch(error)
      })
    },
    updateEmail (email) {
      let self = this
      let user = firebase.auth().currentUser
      user.updateEmail(email).then(function () {
        self.$store.commit('notifyCustom', { title: 'Email Updated', body: `Your email has been succesfully updated.` })
        self.$store.commit('setSessionUserEmail', email)
      }, function (error) {
        self.catch(error)
      })
    }
  },
  beforeMount () {
    let self = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        document.querySelector('#user-settings-name').placeholder = ''
        self.fields.newDisplayName = user.displayName
        document.querySelector('#user-settings-email').placeholder = ''
        self.fields.newEmail = user.email
      } else {
        self.$store.commit('setSessionRequest', self.$route.path)
        self.$router.replace('/signup')
        self.$store.commit('notifyAuthRequired')
      }
    })
  },
  mounted () {
    document.querySelector('#user-settings-name').focus()
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

<style lang="stylus">
@import '../styles/variables.styl'
.page-user-settings .pz-page-header
  border-bottom none
</style>
