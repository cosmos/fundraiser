<template>
<div class="page">
  <page-header :title="$t('siteStats.title')" type="center"></page-header>
</div>
</template>

<script>
import PageHeader from './PageHeader'
export default {
  name: 'page-fund',
  components: {
    PageHeader
  },
  computed: {
    bitcoinPrice () {
      return this.user.atoms / 27394
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    document.title = 'Stats - Cosmos Fundraising'
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'
</style>
