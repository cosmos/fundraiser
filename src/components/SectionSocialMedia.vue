<template>
  <section class="section-social-media">
    <nav>
      <a href="https://www.reddit.com/r/thecosmos" target="_blank">
        <i class="fa fa-reddit"></i>
        <span class="label">r/thecosmos</span>
      </a>
      <a href="http://forum.tendermint.com:3000/" target="_blank">
        <i class="fa fa-slick"></i>
        <span class="label">Slack</span>
      </a>
      <a href="https://twitter.com/cosmos_hq" target="_blank">
        <i class="fa fa-twatter"></i>
        <span class="label">@cosmos_hq</span>
      </a>
      <a href="https://bitcointalk.org/index.php?topic=1607111.0" target="_blank">
        <i class="fa fa-btc"></i>
        <span class="label">Cosmos on BitcoinTalk</span>
      </a>
      <a href="http://webchat.freenode.net" target="_blank">
        <i class="fa fa-commenting-o"></i>
        <span class="label">#cosmos_network on irc.freenode.net</span>
      </a>
    </nav>
  </section>
</template>

<script>
export default {
  name: 'section-social-media'
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.section-social-media
  nav
    border-top dbd
    display flex
    justify-content center
    max-width 960px
    margin 0 auto

  a
    display flex
    align-items center
    cursor pointer
    padding 1.5rem 1rem
    text-align center

    i
      font-size 1.5rem
      color light

    .label
      margin-left 0.4em
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
        font-size 2em
    
@media screen and (min-width: 720px)
  .section-social-media
    nav
      padding 3rem 0
      flex-flow row wrap
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
