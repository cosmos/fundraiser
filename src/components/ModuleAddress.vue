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
