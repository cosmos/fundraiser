<template>
  <module size="sm" class="module-address module-form">
    <div slot="title">Find Cosmos Address</div>
    <div slot="menu"></div>
    <form class="body" v-on:submit.prevent.default="submit">
      <form-group :class="{ 'error': $v.fields.mnemonic.$error }">
        <label for="module-address-mnemonic">12-word Mnemonic</label>
        <field-group>
          <field
            id="module-address-mnemonic"
            v-model="fields.mnemonic"
            placeholder="Enter your mnemonic"
            required>
          </field>
          <btn
            icon="search"
            value="Find"
            type="submit">
          </btn>
        </field-group>
        <form-msg name="Mnemonic" type="required" v-if="!$v.fields.mnemonic.required"></form-msg>
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
import { required } from 'vuelidate/lib/validators'
import Btn from '@nylira/vue-button'
import FieldGroup from './FieldGroup'
import Field from '@nylira/vue-input'
import FormGroup from './FormGroup'
import FormMsg from '@nylira/vue-form-msg'
import Module from './Module'
export default {
  name: 'module-address',
  components: {
    Btn,
    Module,
    FieldGroup,
    Field,
    FormGroup,
    FormMsg
  },
  computed: {
    ...mapGetters(['donation', 'postsale'])
  },
  data: () => ({
    fields: {
      mnemonic: ''
    }
  }),
  methods: {
    submit () {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.$store.dispatch('setDonationMnemonicAndWallet', this.fields.mnemonic)
        this.$store.commit('setCosmosAddress', this.donation.wallet.addresses.cosmos)
      }
    }
  },
  validations: {
    fields: {
      mnemonic: {
        required
      }
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
