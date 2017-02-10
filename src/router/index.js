import VueRouter from 'vue-router'
import { SignUp, SignIn, Reset, Settings } from '@nylira/vue-user-pages'
function r (filename) { return require('../components/Page' + filename) }

const routes = [
  { path: '/', component: r('Index') },
  { path: '/btc', component: r('FundBtc') },
  { path: '/eth', component: r('FundEth') },

  { path: '/signup', name: 'signup', component: SignUp },
  { path: '/signin', name: 'signin', component: SignIn },
  { path: '/reset', name: 'reset', component: Reset },
  { path: '/settings', name: 'settings', component: Settings },

  // wildcards
  { path: '/404', component: r('404') },
  { path: '*', component: r('404') }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
