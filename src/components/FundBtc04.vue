<template>
<form class="form" v-on:submit.prevent.default="nextStep">

  <div class="form-header">
    <div class="title">Step 4</div>
    <div class="subtitle">Pay <strong>{{ bitcoinAmount }} BTC</strong> to the specified Bitcoin address below.</div>
  </div>

  <div class="form-group">
    <label for="fund-btc-payment-address">BTC Payment Address</label>
    <div class="input-group">
      <vue-input
        id="fund-btc-payment-address"
        type="text"
        v-model="btcAddress"
      >
      </vue-input>
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
      <vue-button
        @click="payBitcoin"
        btn-icon="btc"
        btn-value="Open Wallet">
      </vue-button>
    </div>
  </div>

  <div class="form-group">
    <label>You Will Receive</label>
    <div class="input-group">
      <vue-input
        input-type="number"
        v-model="fundBtc.atoms"
      >
      </vue-input>
      <div class="input-group-addon">Atoms</i></div>
    </div>
  </div>

  <div class="form-footer">
    <div></div>
    <vue-button
      btn-type="submit"
      btn-icon="check"
      btn-value="Done!">
    </vue-button>
  </div>

</form>
</template>

</template>

<script>
import { mapGetters } from 'vuex'
import VueInput from '@nylira/vue-input'
import VueButton from '@nylira/vue-button'
export default {
  name: 'fund-btc-04',
  components: {
    VueButton,
    VueInput
  },
  computed: {
    bitcoinAmount () {
      return this.fundBtc.atoms / 2000
    },
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
      this.$store.commit('setFundBtcProgress', 4)
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
