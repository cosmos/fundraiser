<template>
<div class="page">
  <vue-page-header
    :title="$t('siteStats.title')"
    :subtitle="$t('siteStats.subtitle')"
    type="center">
  </vue-page-header>
</div>
</template>

<script>
import VuePageHeader from '@nylira/vue-page-header'
export default {
  name: 'page-stats',
  components: {
    VuePageHeader
  },
  mounted () {
    document.title = 'Stats - Cosmos Fundraising'
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'
</style>
