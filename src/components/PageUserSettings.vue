<template>
<div class="page page-user-settings">
  <page-header :title="newName" type="center"></page-header>
  <pz-user-settings></pz-user-settings>
</div>
</template>

<script>
import PageHeader from './PageHeader'
import PzUserSettings from './PzUserSettings'
import firebase from 'firebase'
export default {
  name: 'page-blog-index',
  components: {
    PageHeader,
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
