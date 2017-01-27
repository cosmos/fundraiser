<template>
<form class="form" v-on:submit.prevent.default="nextStep">

  <div class="form-header">
    <div class="title">Step 4</div>
    <div class="subtitle">Pay <strong>{{ bitcoinAmount }} BTC</strong> to the specified Bitcoin address below.</div>
  </div>

  <div class="form-group">
    <label>Pay BTC To</label>
    <div class="input-group">
      <vue-input
        input-type="text"
        v-model="btcAddress"
      >
      </vue-input>
      <div class="input-group-addon"><i class="fa fa-copy"> Copy</i></div>
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
      btn-value="Complete Payment">
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
    nextStep () {
      console.log('todo: payment step')
      this.$store.commit('setFundBtcProgress', 4)
    }
  }
}
</script>
