<template>
<form class="form" v-on:submit.prevent.default="nextStep">

  <div class="form-header">
    <div class="title">Step 3</div>
    <div class="subtitle">Download your presale atom wallet.</div>
  </div>

  <div class="form-group">
    <div class="input-group">
      <vue-button
        @click.native="downloadWallet"
        icon="download"
        value="Download Wallet"
      >
      </vue-button>
    </div>
    <form-msg body="If the wallet opens in a browser window, copy and paste the contents into a text file."></form-msg>
  </div>

  <div class="form-footer">
    <div></div>
    <vue-button
      type="submit"
      icon="angle-right"
      icon-pos="right"
      value="Continue">
    </vue-button>
  </div>

</form>
</template>

<script>
import dummyWallet from '../store/json/dummyWallet.json'
import FileSaver from 'file-saver'
import { mapGetters } from 'vuex'
import FormMsg from './FormMsg'
import VueButton from '@nylira/vue-button'
export default {
  name: 'fund-btc-03',
  components: {
    VueButton,
    FormMsg
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
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
</script>
