<template>
  <div class="page-index">
    <modules>
      <module-statistics></module-statistics>
      <module-donate v-for="coin in config.COINS" :coin="coin"></module-donate>
      <module-donations></module-donations>
    </modules> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHeader from '@nylira/vue-page-header'
import Modules from './Modules'
import ModuleStatistics from './ModuleStatistics'
import ModuleDonate from './ModuleDonate'
import ModuleDonations from './ModuleDonations'
export default {
  name: 'page-index',
  components: {
    PageHeader,
    Modules,
    ModuleStatistics,
    ModuleDonate,
    ModuleDonations
  },
  computed: {
    ...mapGetters(['config'])
  },
  head: {
    title () {
      return {
        inner: 'Dashboard',
        separator: '-',
        complement: 'Cosmos Fundraise'
      }
    }
  }
}
</script>

