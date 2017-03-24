// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import VueHead from 'vue-head'
import VueI18n from 'vue-i18n'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'

import App from './App'

// sync store and router
import { sync } from 'vuex-router-sync'
import store from './store/index.js'
import router from './router/index.js'
sync(store, router)

store.dispatch('fetchEthDonationAtomRate')

Vue.use(VueAnalytics, {id: 'UA-51029217-2', router: router})
Vue.use(VueHead)
Vue.use(VueI18n)
Vue.use(Vuelidate)
Vue.use(VueRouter)

// i18n settings
Vue.config.lang = 'en'
Vue.config.fallbackLang = 'en'
Vue.locale('en', require('./locale/en.json'))

/* eslint no-unused-vars: 0 */
const app = new Vue({
  router,
  render (h) {
    return h(App)
  },
  store
}).$mount('#app')
