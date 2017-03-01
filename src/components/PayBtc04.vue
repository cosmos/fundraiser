<template>
  <form-struct :submit="nextStep">
    <div slot="title">Pay with BTC</div>
    <div slot="subtitle">Step 4 - Pay {{ btcTransaction.price }} BTC to the specified Bitcoin address below.</div>

    <form-group>
      <label for="fund-btc-payment-address">BTC Payment Address</label>
      <field-group>
        <field
          id="fund-btc-payment-address"
          type="text"
          v-model="btcAddress">
        </field>
      </field-group>

      <label>BTC Payment QR Code</label>
      <field-group>
        <img
          id="fund-btc-payment-qr-code"
          alt="Bitcoin Payment QR Code"
          src="../assets/images/1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi.png">
      </field-group>
    </form-group>

    <form-group>
      <label>Optionally, Pay BTC From Wallet</label>
      <field-group>
        <btn
          @click="payBitcoin"
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
          v-model="btcTransaction.atoms">
        </field>
        <div class="field-group-addon">Atoms</i></div>
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
import FieldGroup from './FieldGroup'
export default {
  name: 'fund-btc-04',
  components: {
    FormStruct,
    FormGroup,
    FormMsg,
    Btn,
    FieldGroup,
    Field
  },
  computed: {
    ...mapGetters(['btcTransaction'])
  },
  data () {
    return {
      btcAddress: '1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi'
    }
  },
  methods: {
    payBitcoin () {
      console.log('paid bitcoin')
    },
    copyBitcoin () {
      console.log('copied to clipboard!')
    },
    nextStep () {
      let self = this
      this.$store.commit('setBtcTransactionTime', Date.now())
      this.$store.commit('addTransaction', this.btcTransaction)
      this.$store.commit('resetBtcTransaction')
      self.$store.commit('notifyCustom', { title: 'Payment Successful', body: `You have succesfully purchased ${this.btcTransaction.atoms} atoms for ${this.btcTransaction.price} btc.` })
      this.$router.push('/')
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0

    let el = document.querySelector('#fund-btc-payment-address')
    el.addEventListener('focus', function () {
      el.select()
    })
  }
}
</script>


<style lang="stylus">
@import '../styles/variables.styl'

#fund-btc-payment-qr-code
  width 242px
  height 242px
  border 1px solid bc
  display block
</style>
