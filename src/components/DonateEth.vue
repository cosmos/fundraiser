<template>
  <form-struct id="form-donate-eth">
    <div slot="title">Donate ETH</div>
    <div slot="subtitle">Send ETH to claim your Atoms.</div>

    <form-group :class="{ 'error': $v.fields.ethAmount.$error }">
      <label for="donate-eth-amount">How much ETH do you want to donate?</label>
      <field-group>
        <field
          id="donate-eth-amount"
          type="number"
          placeholder="ETH Amount"
          v-model="fields.ethAmount"
          :min="config.COINS.ETH.MIN_DONATION"
          :max="config.COINS.ETH.MAX_DONATION"
          required>
        </field>
      </field-group>
      <form-msg :body="exchangeRateString"></form-msg>
      <form-msg name="Eth Amount" type="required" v-if="!$v.fields.ethAmount.required">
      </form-msg>
      <form-msg name="Eth Amount" type="between" v-if="!$v.fields.ethAmount.between">
      <form-msg type="error" body="Eth Amount must be a number" v-if="!$v.fields.ethAmount.numeric">
      </form-msg>
    </form-group>

    <form-group>
      <label for="donate-eth-amount">Approximate ATOM you will receive:</label>
      <field-group>
        <field
          id="donate-eth-atoms"
          type="number"
          v-model="atomAmount"
          disabled>
        </field>
      </field-group>
    </form-group>

    <form-group>
      <form-msg body="The actual Exchange Rate may differ from what is shown
        depending on when the exchange rate is updated on the donation smart
        contract."></form-msg>
      <form-msg body="Check the most recent ETH/BTC rate before submitting a
        donation, and for best results, pay a suffiently large fee to get your
        donation transaction committed quickly."></form-msg>
    </form-group>

    <form-group>
      <p>Copy the <strong>Transaction Data</strong> below into a wallet
        such as MyEtherWallet or Mist. Your Cosmos address is included in the data,
        and the donation will be recorded for that address in the smart contract.</p>
      <label for="donate-eth-donation-tx">Transaction Data</label>
      <field-group>
        <field
          id="donate-eth-donation-tx"
          type="textarea"
          v-model="ethTx"
          v-if="validTransaction">
        </field>
        <field
          v-else
          type="textarea"
          :value="invalidTransactionString"
          disabled>
        </field>
      </field-group>
    </form-group>
  </form-struct>
</template>

<script>
import { mapGetters } from 'vuex'
import { ethereum } from 'cosmos-fundraiser'
import { required, between, numeric } from 'vuelidate/lib/validators'
import Btn from '@nylira/vue-button'
import Field from '@nylira/vue-input'
import FieldGroup from './FieldGroup'
import FormGroup from './FormGroup'
import FormMsg from '@nylira/vue-form-msg'
import FormStruct from './FormStruct'
import Modal from './Modal'
export default {
  name: 'donate-eth',
  components: {
    Btn,
    Field,
    FieldGroup,
    FormGroup,
    FormMsg,
    FormStruct,
    Modal
  },
  computed: {
    validTransaction () {
      let eth = this.fields.ethAmount
      let min = this.config.COINS.ETH.MIN_DONATION
      let max = this.config.COINS.ETH.MAX_DONATION
      return eth >= min && eth <= max
    },
    invalidTransactionString () {
      return `Invalid transaction. You may only contribute between ${this.config.COINS.ETH.MIN_DONATION} and ${this.config.COINS.ETH.MAX_DONATION} ETH per donation. (${this.fields.ethAmount})`
    },
    atomAmount () {
      return this.fields.ethAmount * this.donation.ethRate
    },
    exchangeRateString () {
      return `Exchange rate: 1 ETH : ${this.donation.ethRate} ATOM`
    },
    ethTx () {
      let { addresses } = this.donation.wallet
      let tx = ethereum.getTransaction(
        addresses.cosmos,
        addresses.ethereum,
        this.fields.ethAmount
      )
      return JSON.stringify(tx, null, '  ')
    },
    ...mapGetters(['donation', 'config'])
  },
  data: () => ({
    fields: {
      ethAmount: 0
    }
  }),
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    document.querySelector('#donate-eth-amount').focus()

    let el = document.querySelector('#donate-eth-donation-tx')
    el.addEventListener('focus', function () {
      el.select()
    })
  },
  created () {
    this.$store.dispatch('fetchEthDonationAtomRate')
  },
  validations: {
    fields: {
      ethAmount: {
        numeric,
        required,
        between () {
          let min = this.config.COINS.ETH.MIN_DONATION
          let max = this.config.COINS.ETH.MAX_DONATION
          return between(min, max)
        }
      }
    }
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
  margin-bottom 0.5rem
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
