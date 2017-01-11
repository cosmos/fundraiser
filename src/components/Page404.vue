<template>
  <div class="split-page page-404">
    <div class="page-header">
      <h1>Error 404</h1>
      <p>Page Not Found</p>
    </div>
    <section class="section-default page-content">
      <div class="section-container">
        <div class="section-content article-body">
          <h2>Whoops!</h2>
          <p>The page you visited either does not exist or has been deleted in a website reshuffle. We're sorry for the inconvenience. Try visiting one of these pages below:</p>
          <ul>
            <li><router-link :to="'/'">Home</router-link></li>
            <li><router-link :to="'/info'">Info</router-link></li>
            <li><router-link :to="'/stats'">Stats</router-link></li>
            <li><router-link :to="'/fund'">Fund</router-link></li>
          </ul>
          <p>Please notify us at <a href="mailto:hello@tendermint.com">hello@tendermint.com</a> and we will fix this error as soon as we can. Thank you for your patience.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'page-404',
  mounted () {
    document.title = '404 - Cosmos Fundraising - Internet of Blockchains'
  }
}
</script>
