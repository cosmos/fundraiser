<template>
<div class="page">
  <vue-page-header
    :title="$t('siteInfo.title')"
    :subtitle="$t('siteInfo.subtitle')"
    type="center">
  </vue-page-header>
</div>
</template>

<script>
import VuePageHeader from '@nylira/vue-page-header'
export default {
  name: 'page-info',
  components: {
    VuePageHeader
  },
  mounted () {
    document.title = 'Information - Cosmos Fundraising'
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'
</style>
