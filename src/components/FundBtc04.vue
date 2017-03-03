<template>
  <form-struct :submit="nextStep">
    <div slot="title">Donate BTC</div>
    <div slot="subtitle">Step 4 - Donate {{ btcDonation.price }} BTC to the specified Bitcoin address below.</div>

    <form-group>
      <label for="fund-btc-donation-address">BTC Donation Address</label>
      <field-group>
        <field
          id="fund-btc-donation-address"
          type="text"
          v-model="btcAddress">
        </field>
        <btn-copy :value="btcAddress"></btn-copy>
      </field-group>

      <label>BTC Donation QR Code</label>
      <field-group>
        <img
          id="fund-btc-donation-qr-code"
          alt="Bitcoin Donation QR Code"
          src="../assets/images/1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi.png">
      </field-group>
    </form-group>

    <form-group>
      <label>Optionally, Donate BTC From Wallet</label>
      <field-group>
        <btn
          @click="donateBitcoin"
          icon="btc"
          value="Open Wallet">
        </btn>
      </field-group>
    </form-group>

    <form-group>
      <label>You Will Receive</label>
      <field-group>
        <field
          input-type="number"
          v-model="btcDonation.atoms">
        </field>
        <div class="ni-field-addon">Atoms</div>
      </field-group>
    </form-group>

    <btn
      slot="submit"
      type="submit"
      icon="check"
      value="Done!">
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
import BtnCopy from './BtnCopy'
import FieldGroup from './FieldGroup'
export default {
  name: 'fund-btc-04',
  components: {
    FormStruct,
    FormGroup,
    FormMsg,
    Btn,
    BtnCopy,
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
    donateBitcoin () {
      window.location.href = 'bitcoin:1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi'
    },
    nextStep () {
      this.$store.commit('setBtcDonationTime', Date.now())
      this.$store.commit('addDonation', this.btcDonation)
      this.$store.commit('resetBtcDonation')
      this.$store.commit('notifyCustom', { title: 'Donation Successful', body: `You have donated ${this.btcDonation.price} BTC for ${this.btcDonation.atoms} Atoms.` })
      this.$router.push('/')
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0

    let el = document.querySelector('#fund-btc-donation-address')
    el.addEventListener('focus', function () {
      el.select()
    })
  }
}
</script>


<style lang="stylus">
@import '../styles/variables.styl'

#fund-btc-donation-qr-code
  width 242px
  height 242px
  border 1px solid bc
  display block
</style>
