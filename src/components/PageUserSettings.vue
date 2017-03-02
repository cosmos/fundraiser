<template>
  <div class="page-user ni-forms">
    <form-struct :submit="validateUserSettings">
      <div slot="title">User Settings</div>
      <div slot="subtitle">Edit your personal profile here.</div>
      <form-group :class="{ error: $v.fields.newDisplayName.$error }">
        <label for="user-settings-name">Change Display Name</label>
        <field
          v-model="fields.newDisplayName"
          type="text"
          id="user-settings-name"
          placeholder="New Display Name">
        </field>
        <form-msg name="Display Name" type="required" v-if="!$v.fields.newDisplayName.required"></form-msg>
        <form-msg name="Display Name" type="length" min="2" max="20" v-if="!$v.fields.newDisplayName.menLength || !$v.fields.newDisplayName.maxLength"></form-msg>
      </form-group>
      <form-group :class="{ error: $v.fields.newEmail.$error }">
        <label for="user-settings-email">Change Email</label>
        <field
          v-model="fields.newEmail"
          type="email"
          id="user-settings-email"
          placeholder="New Email">
        </field>
        <form-msg name="Email" type="required" v-if="!$v.fields.newEmail.required"></form-msg>
        <form-msg name="Email" type="valid" v-if="!$v.fields.newEmail.email"></form-msg>
      </form-group>
      <form-group :class="{ error: $v.fields.newPassword.$error }">
        <label for="user-settings-password">Change Password</label>
        <field
          v-model="fields.newPassword"
          type="password"
          id="user-settings-password"
          placeholder="New Password">
        </field>
        <form-msg name="Password" type="length" min="8" max="1024" v-if="!$v.fields.newPassword.minLength || !$v.fields.newPassword.maxLength"></form-msg>
      </form-group>
      <btn slot="submit" type="submit" value="Save Changes"></btn>
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
  name: 'page-user-settings',
  components: {
    Field,
    FieldGroup,
    FormGroup,
    FormMsg,
    FormStruct,
    Btn
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
    validateUserSettings () {
      this.$v.$touch()
      if (this.$v.$error) return
      else this.updateUserSettings()
    },
    updateUserSettings () {
      let changes = 0
      let newDisplayName = this.fields.newDisplayName
      let newEmail = this.fields.newEmail
      let newPassword = this.fields.newPassword

      let oldDisplayName = this.sessionUser.displayName
      let oldEmail = this.sessionUser.email

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
      this.$store.dispatch('setSessionUserDisplayName', name)
    },
    updatePassword (password) {
      this.$store.dispatch('setSessionUserPassword', password)
    },
    updateEmail (email) {
      this.$store.dispatch('setSessionUserEmail', email)
    }
  },
  mounted () {
    if (this.sessionUser.signedIn) {
      document.querySelector('#user-settings-name').placeholder = ''
      this.fields.newDisplayName = this.sessionUser.displayName
      document.querySelector('#user-settings-email').placeholder = ''
      this.fields.newEmail = this.sessionUser.email
    } else {
      this.$store.commit('setSessionRequest', this.$route.path)
      this.$router.replace('/signup')
      this.$store.commit('notifyAuthRequired')
    }
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
