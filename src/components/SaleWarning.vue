<template>
  <div class="sale-warning">
    <div class="title">Notice</div>
    <ul>
      <li>To purchase Atoms, your web browser must have JavaScript enabled. Please turn off any plugins (e.g. NoScript) that disable JavaScript.</li>
      <li>Please do not attempt to purchase Atoms using iOS. The purchase process requires the download of a file, which is best done from Windows, macOS, or Linux.</li>
      <li>(Also, please note that the website makes requests to subdomains and other domains.)</li>
    </ul>
  </div>
</template>

<style lang="stylus">
@import '../styles/variables.styl'

.sale-warning
  max-width 30rem
  margin 0 auto

  border 1px solid hsl(60,100%,40%)
  background hsl(60,100%,95%)
  padding 0.5rem 0.75rem
  font-size 0.75rem
  text-align left
  .title
    font-weight bold
  ul
    list-style disc
    padding-left 1.5em
</style>
