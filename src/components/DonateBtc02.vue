<template>
  <form-struct :submit="finalize">
    <div slot="title">Donate BTC</div>
    <div slot="subtitle"><strong>Please confirm your donation.</strong> Once you confirm, funds will be sent from your intermediate Bitcoin wallet to the Cosmos Fundraiser exodus address.</div>

    <form-group>
      <div class="fund-btc-key-values">
        <div class="key-value">
          <div class="key">Donation Amount</div>
          <div class="value">{{ donationAmount / 1e8 }} BTC</div>
        </div>
        <div class="key-value">
          <div class="key">Bitcoin Fee</div>
          <div class="value">{{ bitcoinFee / 1e8 }} BTC</div>
        </div>
        <div class="key-value">
          <div class="key">Exchange Rate</div>
          <div class="value">1 BTC : {{ config.COINS.BTC.EXCHANGE_RATE }} Atoms</div>
        </div>
      </div>
    </form-group>

    <form-group>
      <label for="your-cosmos-address">Your Cosmos Address</label>
      <field-group>
        <field
          id="your-cosmos-address"
          type="textarea"
          v-model="cosmosAddress">
        </field>
      </field-group>
    </form-group>

    <form-group>
      <p>When the Cosmos blockchain launches, your account will be credited with <strong>{{ atomAmount }} ATOM</strong>.</p>
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
import { bitcoin } from 'cosmos-fundraiser'
import FormMsg from '@nylira/vue-form-msg'
import Field from '@nylira/vue-input'
import FormStruct from './FormStruct'
import FormGroup from './FormGroup'
import Btn from '@nylira/vue-button'
import FieldGroup from './FieldGroup'
export default {
  name: 'donate-btc-02',
  components: {
    FormStruct,
    FormGroup,
    FormMsg,
    Btn,
    FieldGroup,
    Field
  },
  computed: {
    ...mapGetters(['donation', 'config']),
    btcAddress () {
      return this.donation.wallet.addresses.bitcoin
    },
    cosmosAddress () {
      return this.donation.wallet.addresses.cosmos
    },
    finalTx () {
      let { tx, feeRate } = this.donation
      return bitcoin.createFinalTx(tx.utxos, feeRate)
    },
    donationAmount () {
      return this.finalTx.paidAmount
    },
    bitcoinFee () {
      return this.finalTx.feeAmount
    },
    atomAmount () {
      return this.finalTx.atomAmount
    }
  },
  methods: {
    finalize () {
      this.$store.dispatch('finalizeBtcDonation', (err) => {
        if (err) return
        this.$router.push('/')
      })
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.fund-btc-key-values
  .key-value
    div
      display inline-block
    .key
      font-weight 600
      width 150px
</style>
