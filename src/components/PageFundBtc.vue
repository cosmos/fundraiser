<template>
<div class="page page-narrow page-fund">
  <vue-page-header :title="$t('siteFund.titleBtc')" type="center"></vue-page-header>
  <form>
    <div class="form-group">
      <div class="form-group-header">Step 1</header>
      <div class="form-group-content">
        <label>Enter amount to purchase in either Bitcoin or Atoms.
      </div>
    </div>
</div>
</template>

<script>
import VuePageHeader from '@nylira/vue-page-header'
export default {
  name: 'page-fund',
  components: {
    VuePageHeader
  },
  mounted () {
    document.title = this.$t('siteFund.titleBtc') + ' - Cosmos'
    let highlights = document.querySelectorAll('.highlight-on-focus')
    Array.from(highlights).map(function (el) {
      el.addEventListener('click', function () { this.select() })
    })
  }
}
</script>

<style lang="stylus">
.page-fund .pz-page-header
  border-bottom none
</style>
