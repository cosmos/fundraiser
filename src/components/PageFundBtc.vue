<template>
<div class="page page-narrow page-fund">
  <vue-page-header :title="$t('siteFund.titleBtc')" type="center"></vue-page-header>
  <div class="fund-wrapper">
    <page-fund-nav></page-fund-nav>
    <page-fund-step-one></page-fund-step-one>
    <page-fund-step-two></page-fund-step-two>
    <page-fund-step-three></page-fund-step-three>
    <page-fund-step-four></page-fund-step-four>
  </div>
</div>
</template>

<script>
import VuePageHeader from '@nylira/vue-page-header'
import PageFundNav from './PageFundNav'
import PageFundStepOne from './PageFundStepOne'
import PageFundStepTwo from './PageFundStepTwo'
import PageFundStepThree from './PageFundStepThree'
import PageFundStepFour from './PageFundStepFour'
export default {
  name: 'page-fund',
  components: {
    VuePageHeader,
    PageFundNav,
    PageFundStepOne,
    PageFundStepTwo,
    PageFundStepThree,
    PageFundStepFour
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
