<template>
  <form-struct id="form-fund-btc-04">
    <div slot="title">Donate BTC</div>
    <div slot="subtitle">Send BTC to the address below to claim your Atoms.</div>

    <form-group>
      <div class="fund-btc-key-values">
        <div class="key-value">
          <div class="key">Exchange Rate</div>
          <div class="value">1 BTC : {{ config.COINS.BTC.EXCHANGE_RATE }} Atoms</div>
        </div>
        <div class="key-value">
          <div class="key">Min Donation</div>
          <div class="value">{{ config.COINS.BTC.MIN_DONATION }} BTC</div>
        </div>
        <div class="key-value">
          <div class="key">Max Donation</div>
          <div class="value">{{ config.COINS.BTC.MAX_DONATION }} BTC</div>
        </div>
      </div>
    </form-group>

    <form-group>
      <label for="fund-btc-donation-address">Donation Address</label>
      <field-group>
        <field
          id="fund-btc-donation-address"
          type="textarea"
          v-model="btcAddress">
        </field>
      </field-group>

      <button-group>
        <btn-copy :value="btcAddress"></btn-copy>
        <btn
          @click.native="qrCodeToggle(true)"
          icon="qrcode"
          value="QR">
        </btn>
        <btn
          @click.native="donateBitcoin"
          icon="btc"
          value="Pay">
        </btn>
      </button-group>

    </form-group>

    <form-group id="fund-btc-loading">
      <div>
        <div class="container">
          <i class="fa fa-circle-o-notch fa-spin"></i>
          <span>Waiting for donation&hellip;</span>
        </div>
      </div>
    </form-group>

    <modal v-if="qrCodeVisible" id="fund-btc-qr">
      <div slot="title">QR Code</div>
      <div>
        <img
          alt="Donation QR Code"
          :src="qrcode">
        </img>
      </div>
      <div slot="footer">
        <btn value="Return to Page" @click.native="qrCodeToggle(false)"></btn>
      </div>
    </modal>

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
import ButtonGroup from './ButtonGroup'
import Modal from './Modal'
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
    ButtonGroup,
    Field,
    Modal
  },
  computed: {
    ...mapGetters(['btcDonation', 'config']),
    btcAddress () {
      return this.btcDonation.wallet.addresses.bitcoin
    },
    qrcode () {
      let data = qr.imageSync(this.btcAddress, { margin: 0 })
      let base64 = Buffer(data).toString('base64')
      return `data:image/png;base64,${base64}`
    }
  },
  data: () => ({
    qrCodeVisible: false
  }),
  methods: {
    donateBitcoin () {
      window.location.href =
        `bitcoin:${this.btcAddress}?label=My%20Cosmos%20Fundraiser%20wallet`
    },
    nextStep () {
      this.$store.commit('setBtcDonationProgress', 5)
    },
    qrCodeToggle (value) {
      this.qrCodeVisible = value
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

#form-fund-btc-04
  .ni-form-main
    border-bottom none
  .ni-form-footer
    display none

#fund-btc-donation-address
  height 3.5rem !important
  mono()

.fund-btc-key-values
  .key-value
    padding 0.125rem 0
    display flex
    align-items center
    font-size 0.875rem
    .key
      flex 2
      color dim
    .value
      flex 3
      font-weight 500

#fund-btc-loading
  border-bottom none
  > div
    border-bottom none
    background lighten(mcolor, 95%)
    border-radius 0.25rem
    margin 0.5rem 0
    padding 0.75rem 1rem
    text-align center
    i.fa
      margin-right 0.25rem
      color mcolor
    span
      font-weight 400
      color txt

#fund-btc-qr
  img
    width 66.666vw
    max-width 20rem
    display block
    margin 0 auto
  .ni-modal-footer > div
    justify-content center
</style>
