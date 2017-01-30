<template>
<form class="form" v-on:submit.prevent.default="nextStep">

  <div class="form-header">
    <div class="title">Step 3</div>
    <div class="subtitle">Download your presale atom wallet.</div>
  </div>

  <div class="form-group">
    <vue-button
      @click.native="downloadWallet"
      btn-icon="download"
      btn-value="Download Wallet"
    >
    </vue-button>
  </div>

  <div class="form-footer">
    <div></div>
    <vue-button
      btn-type="submit"
      btn-icon="angle-right"
      btn-icon-position="right"
      btn-value="Continue">
    </vue-button>
  </div>

</form>
</template>

<script>
import dummyWallet from '../store/json/dummyWallet.json'
import FileSaver from 'file-saver'
import { mapGetters } from 'vuex'
import VueButton from '@nylira/vue-button'
export default {
  name: 'fund-btc-03',
  components: {
    VueButton
  },
  computed: {
    ...mapGetters(['fundBtc'])
  },
  methods: {
    downloadWallet () {
      let walletString = JSON.stringify(dummyWallet)
      let walletArray = walletString.split('')
      // eslint-disable-next-line
      let blob = new Blob(walletArray, {type: 'text/plain;charset=utf-8'})
      FileSaver.saveAs(blob, 'dummy-atom-wallet.json')
    },
    nextStep () {
      this.$store.commit('setFundBtcProgress', 4)
    }
  }
}
</script>
