<template>
<div class="page">
  <page-header
    :title="$t('siteInfo.title')"
    :subtitle="$t('siteInfo.subtitle')"
    type="center">
  </page-header>
</div>
</template>

<script>
import PageHeader from './PageHeader'
export default {
  name: 'page-info',
  components: {
    PageHeader
  },
  mounted () {
    document.title = 'Information - Cosmos Fundraising'
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'
</style>
