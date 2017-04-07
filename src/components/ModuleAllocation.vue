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
  methods: {
    submit () {
      console.log('finding atom allocation...')
      this.$store.commit('setAtomAllocation', 1337)
    }
  }
}
</script>
