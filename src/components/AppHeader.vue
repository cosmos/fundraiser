<template>
<div>
  <header class="app-header">
    <router-link to="/" class="nav-home" exact>
      <img src="../assets/images/cosmos_logo_m.png" alt="Cosmos Logo">
    </router-link>
    <nav class="app-nav">
      <router-link to="/info">{{ $t('siteHeader.info') }}</router-link>
      <router-link to="/stats" exact>{{ $t('siteHeader.stats') }}</router-link>
      <router-link to="/fund">{{ $t('siteHeader.fund') }}</router-link>
      <a class="nav-github" href="https://cosmos.network">
        <i class="fa fa-home"></i>
        <span class="label">Main Site</span>
      </a>
    </nav>
  </header>
</div>
</template>

<script>
export default {
  name: 'app-header'
}
</script>

<style lang="stylus">
@require '../styles/variables.styl'

.app-header
  position fixed
  top 0
  left 0
  z-index 100
  width 100vw
  display flex
  flex-flow row wrap
  background #fff
  background hsla(0,0,100%,0.95)
  border-bottom 1px solid bc

  a.nav-home
    height 3*x
    padding-left x
    display flex
    align-items center

    color light
    font-weight 400

    img
      display block
      height x
      width auto
      margin-right 0.5rem

  .app-nav
    flex 1
    display flex
    justify-content flex-end
    default-border-top()
    padding-right 0.5rem
    font-size 0.875rem
    a
      display block
      padding 0 0.5*x
      color txt
      default-border-top()
      line-height 3*x
      font-weight 400

      .short
        display inline
      .long
        display none
      &.nav-github
        display none
      &:hover
        color link
      &.router-link-active
        color light

@media screen and (min-width: 360px)
  .app-header
    a.nav-home img
      height x*1.125
    .app-nav
      a
        font-size x*0.95

@media screen and (min-width: 400px)
  .app-header
    .app-nav
      a
        font-size x
        .short
          display none
        .long
          display inline

@media screen and (min-width: 480px)
  .app-header
    .app-nav
      padding-left 0.75*x
      a
        padding 0 0.75*x
        &.nav-github
          display block

@media screen and (min-width: 640px)
  .app-header
    .app-nav
      a
        padding 0 1.5*x

@media screen and (min-width: 720px)
  .app-header
    .app-nav
      a
        i.fa
          margin-right 0.25*x
        .label
          display inline
</style>
