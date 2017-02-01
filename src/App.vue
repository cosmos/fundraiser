<template>
  <div id="app">
    <app-header></app-header>
    <div id="app-content">
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
    <notifications></notifications>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import Notifications from './components/Notifications.vue'
import store from './store/index.js'
// import getLang from './scripts/getLang.js'
// import Vue from 'vue'
import firebase from './scripts/firebase.js'

export default {
  components: {
    AppHeader,
    AppFooter,
    Notifications
  },
  head: {
    meta: [
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: require('./assets/favicon/ms-icon-144x144.png') },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { r: 'apple-touch-icon', sz: '57x57', h: require('./assets/favicon/apple-icon-57x57.png') },
      { r: 'apple-touch-icon', sz: '60x60', h: require('./assets/favicon/apple-icon-60x60.png') },
      { r: 'apple-touch-icon', sz: '72x72', h: require('./assets/favicon/apple-icon-72x72.png') },
      { r: 'apple-touch-icon', sz: '76x76', h: require('./assets/favicon/apple-icon-76x76.png') },
      { r: 'apple-touch-icon', sz: '114x114', h: require('./assets/favicon/apple-icon-114x114.png') },
      { r: 'apple-touch-icon', sz: '120x120', h: require('./assets/favicon/apple-icon-120x120.png') },
      { r: 'apple-touch-icon', sz: '144x144', h: require('./assets/favicon/apple-icon-144x144.png') },
      { r: 'apple-touch-icon', sz: '152x152', h: require('./assets/favicon/apple-icon-152x152.png') },
      { r: 'apple-touch-icon', sz: '180x180', h: require('./assets/favicon/apple-icon-180x180.png') },
      { r: 'icon', t: 'image/png', sz: '192x192', h: require('./assets/favicon/android-icon-192x192.png') },
      { r: 'icon', t: 'image/png', sz: '32x32', h: require('./assets/favicon/favicon-32x32.png') },
      { r: 'icon', t: 'image/png', sz: '96x96', h: require('./assets/favicon/favicon-96x96.png') },
      { r: 'icon', t: 'image/png', sz: '16x16', h: require('./assets/favicon/favicon-16x16.png') },
      { r: 'manifest', h: require('./assets/favicon/manifest.json') }
    ]
  },
  mounted () {
    let self = this
    // Vue.config.lang = getLang()
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.$store.commit('setSessionUserDisplayName', user.displayName)
        self.$store.commit('setSessionUserEmail', user.email)
        self.$store.commit('setSessionUserPhotoUrl', user.photoUrl)
        self.$store.commit('setSessionUserUid', user.uid)
        console.log('signed in:', user.email)
      } else {
        self.$store.commit('clearSessionUser')
        // console.log('signed out')
      }
    })
  },
  store
}
</script>

<style lang="stylus">
@import './styles/screen.styl' screen
</style>
