<template>
<div class="page">
  <vue-page-header title="Reset Password"></vue-page-header>
  <form class="form form-narrow" v-on:submit.prevent.default="resetPassword">
    <div class="form-header">
      <div class="subtitle">Enter your email and we'll send you a password reset link.</div>
    </div>
    <div class="form-group">
      <label for="user-reset-email">Email</label>
      <input
        v-model="email"
        type="email"
        id="user-signup-email"
        placeholder="name@example.com"
        pattern=".{3,512}" required title="3 to 254 characters"
        required>
    </div>
    <div class="form-footer">
      <div></div>
      <vue-button btn-type="submit" btn-value="Reset Password"></vue-button>
    </div>
  </form>
</div>
</template>

<script>
import VuePageHeader from '@nylira/vue-page-header'
import firebase from '../scripts/firebase'
import VueButton from '@nylira/vue-button'
export default {
  name: 'page-blog-index',
  components: {
    VuePageHeader,
    VueButton
  },
  data () {
    return {
      email: ''
    }
  },
  methods: {
    resetPassword () {
      firebase.auth.sendPasswordResetEmail(this.email).then(function () {
        console.log('email sent')
      }, function (error) {
        console.log(error)
      })
      this.$router.push('/')
    }
  }
}
</script>
