import VueRouter from 'vue-router'
function r (filename) { return require('../components/Page' + filename) }

const routes = [
  { path: '/', component: r('Index') },
  { path: '/donate/:currency', component: r('Donate') },

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
