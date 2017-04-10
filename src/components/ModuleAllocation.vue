<template>
  <module size="sm" class="module-allocation module-form">
    <div slot="title">Find Atom Allocation</div>
    <div slot="menu"></div>
    <form class="body" v-on:submit.prevent.default="submit">
      <form-group>
        <label for="module-allocation-address">Cosmos Address</label>
        <field-group>
          <field
            id="module-allocation-address"
            v-model="postsale.cosmosAddress"
            placeholder="Enter your address">
          </field>
          <btn icon="search" value="Find" type="submit"></btn>
        </field-group>
        <span v-if="error" style="color:red">{{ error }}</span>
      </form-group>
      <form-group>
        <label for="module-allocation-atoms">Suggested Atom Allocation</label>
        <field-group>
          <field
            id="module-allocation-atoms"
            v-model="postsale.atomAllocation"
            placeholder="Will appear here...">
          </field>
          <div class="ni-field-addon">ATOM</div>
        </field-group>
      </form-group>
    </form>
    <div slot="footer">
      <div><i class="fa fa-info-circle"></i> Suggested atom allocation is an approximate value.</div>
    </div>
  </module>
</template>

<script>
import { mapGetters } from 'vuex'
import cfr from 'cosmos-fundraiser'
const { allocation } = cfr
import Btn from '@nylira/vue-button'
import FormGroup from './FormGroup'
import FieldGroup from './FieldGroup'
import Field from '@nylira/vue-input'
import Module from './Module'

export default {
  name: 'module-allocation',
  components: {
    Btn,
    Module,
    FormGroup,
    FieldGroup,
    Field
  },
  computed: {
    ...mapGetters(['config', 'postsale'])
  },
  data () {
    return {
      error: ''
    }
  },
  methods: {
    submit () {
      let { commit } = this.$store
      let cosmosAddress = this.postsale.cosmosAddress || ''
      if (cosmosAddress.startsWith('0x')) {
        cosmosAddress = cosmosAddress.substring(2, cosmosAddress.length)
      }
      this.error = ''
      if (cosmosAddress.length < 40) {
        this.error = 'Address length too short'
      } else if (cosmosAddress.length > 40) {
        this.error = 'Address length too long'
      } else {
        let atoms = allocation.fundraiserAtoms[cosmosAddress]
        commit('setAtomAllocation', atoms)
        if (!(atoms > 0)) {
          this.error = 'Address unrecognized'
        }
      }
    }
  }
}
</script>
