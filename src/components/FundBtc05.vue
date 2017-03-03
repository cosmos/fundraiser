<template>
  <form-struct :submit="finalize">
    <div slot="title">Donate BTC</div>
    <div slot="subtitle">Step 5 - Finalize your contribution.</div>

    <form-group>
      <div class="btc-donation-final-field">
        <strong>Donation Amount</strong>
        <span>{{ donationAmount / 1e8 }} BTC</span>
      </div>
      <div class="btc-donation-final-field">
        <strong>Bitcoin Fee</strong>
        <span>{{ bitcoinFee / 1e8 }} BTC</span>
      </div>
      <div class="btc-donation-final-field">
        <strong>Exchange Rate</strong>
        <span>1 BTC : {{ this.config.COINS.BTC.EXCHANGE_RATE }} ATOM</span>
      </div>
      <div class="btc-donation-final-field">
        <strong>Your Cosmos Address</strong>
        <span>{{ cosmosAddress }}</span>
      </div>
      <br />
      <div>
        <span>Once the Cosmos blockchain launches, your account will be credited with <strong>{{ atomAmount }} ATOM</strong>.</span>
      </div>
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
    ...mapGetters(['btcDonation', 'config', 'sessionClient']),
    btcAddress () {
      return this.btcDonation.wallet.addresses.bitcoin
    },
    cosmosAddress () {
      return this.btcDonation.wallet.addresses.cosmos
    },
    finalTx () {
      let { wallet, tx } = this.btcDonation
      let finalTx = bitcoin.createFinalTx(wallet, tx)
      return finalTx
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
      let testnet = process.env.NODE_ENV === 'development'

      var pushTx
      if (testnet) {
        pushTx = (tx, cb) => this.sessionClient.pushTx(tx, cb)
      } else {
        pushTx = (tx, cb) => bitcoin.pushTx(tx, { tesnet: false }, cb)
      }

      pushTx(this.finalTx.tx, (err, res) => {
        if (err) {
          console.error(err)
          return this.$store.commit('notifyError', {
            title: 'Bitcoin Error',
            body: 'Could not broadcast donation transaction.'
          })
        }
        console.log('res', res)
        // TODO: submit tx to API server
        this.$store.commit('setBtcDonationTime', Date.now())
        this.$store.commit('addDonation', this.btcDonation)
        this.$store.commit('resetBtcDonation')
        this.$store.commit('notifyCustom', {
          title: 'Donation Successful',
          body: `You have succesfully donated ${this.donationAmount / 1e8} BTC and will receive ${this.atomAmount} ATOM.`
        })
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

.btc-donation-final-field
  strong
    display inline-block
    width 190px
</style>
