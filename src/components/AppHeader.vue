<template>
<header class="app-header">
  <div class="container">

  <div class="header-item" @click="toggleMenuApp" v-if="!desktop">
    <i v-if="!activeMenuApp" class="fa fa-bars"></i>
    <i v-else class="fa fa-times"></i>
  </div>

  <router-link to="/" @click.native="closeMenus" id="logo" class="header-item">
    <img class="title" src="../assets/images/cosmos_logo_m.png" alt="Cosmos Logo">
    <span class="subtitle">Fundraiser</span>
  </router-link>

  <menu class="menu-popup menu-app" v-if="activeMenuApp || desktop">
    <nav class="nav-app">
      <router-link to="/" @click.native="closeMenus" exact>Dashboard</router-link>
      <router-link to="/btc" @click.native="closeMenus">Pay with BTC</router-link>
      <router-link to="/eth" @click.native="closeMenus">Pay with ETH</router-link>
    </nav>
    <!--
    <nav>
      <a href="https://cosmos.network">
        <span class="label">Cosmos</span>
        <i class="fa fa-external-link"></i>
      </a>
    </nav>
    -->
  </menu>

  <div class="header-item header-item-toggle" @click="toggleMenuUser">
    <i v-if="!activeMenuUser && !sessionUser.signedIn" class="fa fa-user-o"></i>
    <i v-else-if="!activeMenuUser &&  sessionUser.signedIn" class="fa fa-user"></i>
    <i v-else class="fa fa-times"></i>

    <template v-if="desktop">
      <div v-if="sessionUser.signedIn">Profile</div>
      <div v-else>Sign In</div>
    </template>
  </div>

  <menu class="menu-popup menu-user" v-if="activeMenuUser || desktop">
    <nav class="nav-user">
      <template v-if="sessionUser.signedIn">
        <router-link to="/settings">Settings</router-link>
        <a @click="signOut">Sign Out</a>
      </template>
      <template v-else>
        <a @click="signUp" exact>{{ $t('siteHeader.signup') }}</a>
        <a @click="signIn">{{ $t('siteHeader.signin') }}</a>
      </template>
    </nav>
  </menu>
  </div>
</header>
</template>

<script>
import { mapGetters } from 'vuex'
import disableScroll from 'disable-scroll'
export default {
  name: 'app-header',
  computed: {
    displayName () {
      if (this.sessionUser.displayName) {
        return this.sessionUser.displayName
      } else {
        return 'Loading...'
      }
    },
    isTocPage () {
      return this.$route.name === 'whitepaper' || this.$route.name === 'whitepaper-localized' || this.$route.name === 'faq' || this.$route.name === 'faq-localized' || this.$route.name === 'plan' || this.$route.name === 'plan-localized'
    },
    ...mapGetters(['sessionUser'])
  },
  data () {
    return {
      activeMenuApp: false,
      activeMenuUser: false,
      desktop: false
    }
  },
  methods: {
    closeMenus () {
      this.activeMenuApp = false
      this.activeMenuUser = false
      disableScroll.off()
    },
    toggleMenuApp () {
      this.activeMenuApp = !this.activeMenuApp
      if (this.activeMenuApp) disableScroll.on()
      else disableScroll.off()
    },
    toggleMenuUser () {
      this.activeMenuUser = !this.activeMenuUser
      if (this.activeMenuUser) disableScroll.on()
      else disableScroll.off()
    },
    signUp () {
      this.closeMenus()
      this.$store.commit('setSessionRequest', this.$route.path)
      this.$router.push('/signup')
    },
    signIn () {
      this.closeMenus()
      this.$store.commit('setSessionRequest', this.$route.path)
      this.$router.push('/signin')
    },
    signOut () {
      this.closeMenus()
      this.$store.commit('signOut')
      this.$store.commit('notifyCustom', { title: 'Signed Out', body: 'Come back again soon!' })
      // this.$store.commit('notifyError', { title: error.code, body: error.message })
    },
    watchWindowSize () {
      let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      if (w >= 1024) {
        this.closeMenus()
        this.desktop = true
        return
      }
      this.desktop = false
      return
    }
  },
  mounted () {
    this.watchWindowSize()
    window.onresize = this.watchWindowSize
  }
}
</script>

<style lang="stylus">
@require '../styles/variables.styl'

.app-header
  position fixed
  top 0
  left 0
  z-index 100
  width 100%

  background #fff
  box-shadow hsla(0,0,0,0.1) 0 1px 3px

  .container
    display flex
    flex-flow row wrap
    justify-content space-between
    max-width 1024px
    margin 0 auto

  .header-item
    height 3*x
    display flex
    align-items center
    padding 0 1rem

    color txt
    cursor pointer
    user-select none
    &:hover
      color link

    i.fa
      width 1rem
      text-align center
    i.fa + div
      margin-left 0.25rem

  #logo
    display flex
    flex-flow column
    align-items center
    justify-content center
    .title
      display block
      height 1rem
      width auto
      margin-bottom 0.15rem
    .subtitle
      font-weight bold
      font-size 0.5rem
      letter-spacing 0.23rem
      text-transform uppercase
      color light
      line-height 1

  .menu-popup
    nav
      a
        display flex
        align-items center
        cursor pointer
        height 3rem
        .label
          flex 1
        i.fa
          margin-left 0.5rem
          color light
          margin-top 0.2rem
        img
          height 1rem
          margin-right 0.1rem
        &:hover
          i.fa
            color link

@media screen and (max-width:1023px)
  .menu-popup
    height 100vh
    position fixed
    top 3rem
    left 0
    bottom 0
    width 100vw
    z-index 100000

    background c-app-fg
    user-select none

    nav
      display flex
      flex-flow column
      padding 1.5rem 3rem

      a
        padding 0.75rem 0
        color txt
        border-bottom 1px solid bc
        &:last-of-type
          border-bottom none
        &:hover
          color link

@media screen and (min-width:1024px)
  .menu-popup nav a
  .header-item div
    font-weight 400

  .menu-popup
    display flex
    padding 0 1rem
    nav
      display flex
      flex-flow row
      align-items center
      a
        padding 0 1rem
        color txt
        font-weight 400
        border-left 1px solid bc
        &:last-of-type
          border-right 1px solid bc
        &.router-link-active
          background lighten(bc, 75%)
          background linear-gradient(top, hsl(0,0,96%), hsl(0,0,98%))
    &.menu-user
      padding-right 0
      nav a:first-of-type
        border-left none
      nav a:last-of-type
        border-right none
  .app-header
    .header-item.header-item-toggle
      display none
</style>
