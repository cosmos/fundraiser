<template>
<div class="page page-narrow page-fund">
  <page-header :title="$t('siteFund.title')" type="center"></page-header>
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
import PageHeader from './PageHeader'
import PageFundNav from './PageFundNav'
import PageFundStepOne from './PageFundStepOne'
import PageFundStepTwo from './PageFundStepTwo'
import PageFundStepThree from './PageFundStepThree'
import PageFundStepFour from './PageFundStepFour'
export default {
  name: 'page-fund',
  components: {
    PageHeader,
    PageFundNav,
    PageFundStepOne,
    PageFundStepTwo,
    PageFundStepThree,
    PageFundStepFour
  },
  mounted () {
    document.title = 'Purchase Atoms - Cosmos'
    let highlights = document.querySelectorAll('.highlight-on-focus')
    Array.from(highlights).map(function (el) {
      el.addEventListener('click', function () { this.select() })
    })
  }
}
</script>

<style lang="stylus">
.page-fund .page-header
  border-bottom none
</style>
