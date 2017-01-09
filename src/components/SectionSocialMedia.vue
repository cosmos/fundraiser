<template>
  <section class="section-social-media">
    <nav>
      <a href="https://www.reddit.com/r/thecosmos" target="_blank">
        <i class="fa fa-reddit"></i>
        <span class="label">r/thecosmos</span>
      </a>
      <a href="http://forum.tendermint.com:3000/" target="_blank">
        <i class="fa fa-slick"></i>
        <span class="label">Tendermint</span>
      </a>
      <a href="https://twitter.com/cosmos_hq" target="_blank">
        <i class="fa fa-twatter"></i>
        <span class="label">@cosmos_hq</span>
      </a>
    </nav>
  </section>
</template>

<script>
import FormEmailSignup from './FormEmailSignup'
export default {
  name: 'section-social-media',
  components: {
    FormEmailSignup
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.section-social-media
  nav
    border-top dbd
    display flex
    justify-content center

  a
    display flex
    cursor pointer
    padding 1.5rem

    i
      font-size 1.5rem
      color light
      margin-right 0.4em

    .label
      display none
      color txt

    &:hover
      text-decoration none
      img
        opacity 1
      .label
        color txt

@media screen and (min-width: 360px)
  .section-social-media
    a
      i
        font-size 2.25em
    
@media screen and (min-width: 720px)
  .section-social-media
    nav
      padding 3rem 0
    a
      display flex
      align-items center
      .label
        display block

@media screen and (min-width: 1200px)
  .section-social-media
    a
      padding-left 3rem
      padding-right 3rem
</style>
