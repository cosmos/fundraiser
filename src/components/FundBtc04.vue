<template>
  <form-struct>
    <div slot="title">Donate BTC</div>
    <div slot="subtitle">Step 4 - Send {{ btcDonation.price ? btcDonation.price : '' }} BTC to the address below to continue.</div>

    <form-group>
      <field-group>
        <i id="btc-donation-spinner" class="fa fa-spinner fa-spin"></i>
        <span>&nbsp;Waiting for transaction...</span>
      </field-group>
    </form-group>

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
          v-bind:src="qrcode">
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
  </form-struct>
</template>

<script>
import { mapGetters } from 'vuex'
import qr from 'qr-image'
import { bitcoin } from 'cosmos-fundraiser'
import FormMsg from '@nylira/vue-form-msg'
import Field from '@nylira/vue-input'
import FormStruct from './FormStruct'
import FormGroup from './FormGroup'
import Btn from '@nylira/vue-button'
import BtnCopy from './BtnCopy'
import FieldGroup from './FieldGroup'
const testnet = process.env.NODE_ENV === 'development'
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
    },
    qrcode () {
      let data = qr.imageSync(this.btcAddress, { margin: 0 })
      let base64 = Buffer(data).toString('base64')
      return `data:image/png;base64,${base64}`
    }
  },
  methods: {
    donateBitcoin () {
      console.log('opening wallet...')
      window.location.href = 'bitcoin:1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi'
    },
    nextStep () {
      this.$store.commit('setBtcDonationProgress', 5)
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0

    let el = document.querySelector('#fund-btc-donation-address')
    el.addEventListener('focus', function () {
      el.select()
    })

    console.log('waiting for tx to ' + this.btcAddress)
    bitcoin.waitForTx(this.btcAddress, { testnet }, (err, tx) => {
      if (err) {
        console.error(err)
        return this.$store.commit('notifyError', {
          title: 'Bitcoin Error',
          body: 'An error occurred when trying to get Bitcoin transaction data.'
        })
      }
      console.log('got tx:', tx)
      this.$store.commit('setBtcDonationTx', tx)
      this.$store.commit('setBtcDonationProgress', 5)
    })
  }
}
</script>


<style lang="stylus">
@import '../styles/variables.styl'

#fund-btc-donation-qr-code
  width 145px
  height 145px
  border 1px solid bc
  display block

#btc-donation-spinner
  height 1em
  position relative
  top 4px
</style>
