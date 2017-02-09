<template>
<form class="form" v-on:submit.prevent.default="nextStep">

  <div class="form-header">
    <div class="title">Step 4</div>
    <div class="subtitle">Pay <strong>{{ fundBtc.price }} BTC</strong> to the specified Bitcoin address below.</div>
  </div>

  <div class="form-group">
    <label for="fund-btc-payment-address">BTC Payment Address</label>
    <div class="input-group">
      <field
        id="fund-btc-payment-address"
        type="text"
        v-model="btcAddress"
      >
      </field>
    </div>

    <label>BTC Payment QR Code</label>
    <div class="input-group">
      <img
        id="fund-btc-payment-qr-code"
        alt="Bitcoin Payment QR Code"
        src="../assets/images/1EJyXYXPRRiPkTkU3xVPfgYxNRusGVijEi.png">
    </div>
  </div>

  <div class="form-group">
    <label>Optionally, Pay BTC From Wallet</label>
    <div class="input-group">
      <btn
        @click="payBitcoin"
        icon="btc"
        value="Open Wallet">
      </btn>
    </div>
  </div>

  <div class="form-group">
    <label>You Will Receive</label>
    <div class="input-group">
      <field
        input-type="number"
        v-model="fundBtc.coins"
      >
      </field>
      <div class="input-group-addon">Atoms</i></div>
    </div>
  </div>

  <div class="form-footer">
    <div></div>
    <btn
      type="submit"
      icon="check"
      value="Done!">
    </btn>
  </div>

</form>
</template>

</template>

<script>
import { mapGetters } from 'vuex'
import Field from '@nylira/vue-input'
import Btn from '@nylira/vue-button'
export default {
  name: 'fund-btc-04',
  components: {
    Btn,
    Field
  },
  computed: {
    ...mapGetters(['fundBtc'])
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
      this.$store.commit('setFundBtcTime', Date.now())
      this.$store.commit('addTransaction', this.fundBtc)
      this.$store.commit('resetFundBtc', this.fundBtc)
      self.$store.commit('notifyCustom', { title: 'Payment Successful', body: `You have succesfully purchased ${this.fundBtc.coins} atoms for ${this.fundBtc.price} btc.` })
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
  border 1px solid bc
  display block
</style>
