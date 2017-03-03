<template>
  <form-struct :submit="finalize">
    <div slot="title">Donate BTC</div>
    <div slot="subtitle">Step 5 - Confirm your contribution.</div>

    <form-group>
      // TODO: show Bitcoin tx, atom amount, etc.
    </form-group>

    <btn
      slot="submit"
      type="submit"
      icon="check"
      value="Confirm Contribution">
    </btn>

  </form-struct>
</template>

<script>
import { mapGetters } from 'vuex'
import FormMsg from '@nylira/vue-form-msg'
import Field from '@nylira/vue-input'
import FormStruct from './FormStruct'
import FormGroup from './FormGroup'
import Btn from '@nylira/vue-button'
import FieldGroup from './FieldGroup'
export default {
  name: 'fund-btc-05',
  components: {
    FormStruct,
    FormGroup,
    FormMsg,
    Btn,
    FieldGroup,
    Field
  },
  computed: {
    ...mapGetters(['btcDonation']),
    btcAddress () {
      return this.btcDonation.wallet.addresses.bitcoin
    }
  },
  methods: {
    finalize () {
      let self = this
      // TODO: submit final tx, do this stuff on callback
      this.$store.commit('setBtcDonationTime', Date.now())
      this.$store.commit('addDonation', this.btcDonation)
      this.$store.commit('resetBtcDonation')
      self.$store.commit('notifyCustom', {
        title: 'Donation Successful',
        body: `You have succesfully purchased ${this.btcDonation.atoms} atoms for ${this.btcDonation.price} btc.`
      })
      this.$router.push('/')
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
</script>


<style lang="stylus">
@import '../styles/variables.styl'
</style>
