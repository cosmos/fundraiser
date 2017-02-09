<template>
  <page-split>
    <page-header
      title="Error 404"
      subtitle="Page Not Found"
      type="split">
    </page-header>
    <article-body>
      <p><strong>Whoops!</strong> The page you visited either does not exist or has been deleted in a website reshuffle. We're sorry for the inconvenience. Try visiting one of these pages below:</p>
      <ul>
        <li><router-link :to="'/'">Dashboard</router-link></li>
        <li><router-link :to="'/signup'">Sign Up</router-link></li>
        <li><router-link :to="'/signin'">Sign In</router-link></li>
      </ul>
      <p>Please notify us at <a href="mailto:hello@tendermint.com">hello@tendermint.com</a> and we will fix this error as soon as we can. Thank you for your patience.</p>
    </article-body>
  </page-split>
</template>

<script>
import PageSplit from '@nylira/vue-page-split'
import PageHeader from '@nylira/vue-page-header'
import ArticleBody from '@nylira/vue-article-body'
export default {
  name: 'page-404',
  components: {
    PageSplit,
    PageHeader,
    ArticleBody
  },
  mounted () {
    document.title = '404 - Cosmos Fundraising - Internet of Blockchains'
  }
}
</script>
