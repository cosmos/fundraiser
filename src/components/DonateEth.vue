<template>
  <form-struct id="form-donate-eth">
    <div slot="title">Donate ETH</div>
    <div slot="subtitle">Send ETH to claim your Atoms.</div>

    <form-group>
      <div class="donate-eth-key-values">
        <div class="key-value">
          <div class="key">Exchange Rate<sup>*</sup></div>
          <div class="value">1 ETH : {{ donation.ethRate }} Atoms</div>
        </div>
        <div class="key-value">
          <div class="key">Min Donation</div>
          <div class="value">{{ config.COINS.ETH.MIN_DONATION }} ETH</div>
        </div>
        <div class="key-value">
          <div class="key">Max Donation</div>
          <div class="value">{{ config.COINS.ETH.MAX_DONATION }} ETH</div>
        </div>
      </div>
      <p class="disclaimer">
        <sup>*</sup> The actual Exchange Rate may differ from what is shown
        depending on when the exchange rate is updated on the donation smart
        contract.  Check the most recent ETH/BTC rate before submitting a
        donation, and for best results, pay a suffiently large fee to get your
        donation transaction committed quickly.
      </p>
    </form-group>

    <form-group>
      <label for="cosmos-address">Your Cosmos Address</label>
      <field-group>
        <field
          id="cosmos-address"
          type="textarea"
          v-model="cosmosAddr">
        </field>
      </field-group>
    </form-group>

    <form-group>
      <p>To make your donation, copy and paste this information into a wallet
  such as MyEtherWallet or Mist. Be sure to include an amount of ETH to
  donate! Your Cosmos address is included in the data, and the donation
  will be recorded for that address in the smart contract.</p>
      <label for="donate-eth-donation-tx">Transaction Data</label>
      <field-group>
        <field
          id="donate-eth-donation-tx"
          type="textarea"
          v-model="ethTx">
        </field>
      </field-group>
    </form-group>
  </form-struct>
</template>

<script>
import { mapGetters } from 'vuex'
import { ethereum } from 'cosmos-fundraiser'
import Btn from '@nylira/vue-button'
import Field from '@nylira/vue-input'
import FieldGroup from './FieldGroup'
import FormGroup from './FormGroup'
import FormStruct from './FormStruct'
import Modal from './Modal'
export default {
  name: 'donate-eth',
  components: {
    Btn,
    Field,
    FieldGroup,
    FormGroup,
    FormStruct,
    Modal
  },
  computed: {
    ethTx () {
      let { addresses } = this.donation.wallet
      let tx = ethereum.getTransaction(
        addresses.cosmos,
        addresses.ethereum
      )
      return JSON.stringify(tx, null, '  ')
    },
    cosmosAddr () {
      let { addresses } = this.donation.wallet
      return addresses.cosmos
    },
    ...mapGetters(['donation', 'config'])
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0

    let el = document.querySelector('#donate-eth-donation-tx')
    el.addEventListener('focus', function () {
      el.select()
    })
  },
  created () {
    this.$store.dispatch('fetchEthDonationAtomRate')
  }
}
</script>


<style lang="stylus">
@import '../styles/variables.styl'

#form-donate-eth
  .ni-form-main
    border-bottom none
  .ni-form-footer
    display none

#donate-eth-donation-tx
  height 14rem !important
  mono()

.donate-eth-key-values
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
</style>
