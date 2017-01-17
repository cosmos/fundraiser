<template>
<div class="page page-user-settings">
  <vue-page-header :title="newName" type="center"></vue-page-header>
  <pz-user-settings></pz-user-settings>
</div>
</template>

<script>
import VuePageHeader from '@nylira/vue-page-header'
import PzUserSettings from './PzUserSettings'
import firebase from 'firebase'
export default {
  name: 'page-blog-index',
  components: {
    VuePageHeader,
    PzUserSettings
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
