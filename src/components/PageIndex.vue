<template>
  <div class="page-index">
    <page-header></page-header>
    <modules>
      <module-statistics></module-statistics>
      <module-address></module-address>
      <module-allocation></module-allocation>
      <module-donations></module-donations>
    </modules> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHeader from './PageHeader'
import Modules from './Modules'
import ModuleStatistics from './ModuleStatistics'
import ModuleAddress from './ModuleAddress'
import ModuleAllocation from './ModuleAllocation'
import ModuleDonations from './ModuleDonations'
export default {
  name: 'page-index',
  components: {
    PageHeader,
    Modules,
    ModuleAddress,
    ModuleAllocation,
    ModuleStatistics,
    ModuleDonations
  },
  computed: {
    ...mapGetters(['config'])
  },
  head: {
    title () {
      return {
        inner: 'Cosmos Fundraiser',
        separator: '-',
        complement: 'Internet of Blockchains'
      }
    }
  }
}
</script>
