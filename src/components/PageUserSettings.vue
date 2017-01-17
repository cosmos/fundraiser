<template>
<div class="page page-user-settings">
  <vue-page-header :title="session.user.displayName" type="center"></vue-page-header>
  <vue-user-settings :user="user" :session="session"></vue-user-settings>
</div>
</template>

<script>
import VuePageHeader from '@nylira/vue-page-header'
import VueUserSettings from './VueUserSettings'
import firebase from 'firebase'
export default {
  name: 'page-user-settings',
  components: {
    VuePageHeader,
    VueUserSettings
  },
  computed: {
    session () {
      return this.$store.state.session
    }
  },
  data () {
    return {
      user: firebase.auth().currentUser
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
  }
}
</script>
