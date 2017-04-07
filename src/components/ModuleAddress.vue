<template>
  <module size="sm" class="module-address module-form">
    <div slot="title">Find Cosmos Address</div>
    <div slot="menu"></div>
    <form class="body" v-on:submit.prevent.default="submit">
      <form-group>
        <label for="module-address-mnemonic">12-word Mnemonic</label>
        <field-group>
          <field
            id="module-address-mnemonic"
            v-model="postsale.mnemonic"
            placeholder="Enter your mnemonic"
            required>
          </field>
          <btn
            icon="search"
            value="Find"
            type="submit">
          </btn>
        </field-group>
      </form-group>
      <form-group>
        <label for="module-address-address">Cosmos Address</label>
        <field-group>
          <field
            id="module-address-address"
            v-model="postsale.cosmosAddress"
            placeholder="Will appear here...">
          </field>
        </field-group>
      </form-group>
    </form>
    <div slot="footer">
      <div><i class="fa fa-exclamation-triangle"></i> Losing your mnemonic results in irretrievable ATOMs.</div>
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
  name: 'module-address',
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
      console.log('finding Cosmos address...')
      this.$store.commit('setCosmosAddress', 'SAMPLE_COSMOS_ADDRESS')
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.module-form
  .body
    display block

  .ni-field-group
    .ni-field + .ni-btn-wrapper
      margin-left -1px
    .ni-field-addon
      width auto
</style>
