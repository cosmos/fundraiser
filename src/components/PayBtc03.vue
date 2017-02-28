<template>
<form class="form" v-on:submit.prevent.default="nextStep">

  <div class="form-header">
    <div class="title">Pay with BTC</div>
    <div class="subtitle">Step 3 - Download your presale atom wallet.</div>
  </div>

  <div id="form-group-download" class="form-group">
    <div class="input-group">
      <btn
        @click.native="downloadWallet"
        icon="download"
        value="Download Wallet"
      >
      </btn>
    </div>
    <form-msg body="If the wallet opens in a browser window, copy and paste the contents into a text file."></form-msg>
    <form-msg type="error" body="You must download the wallet file before continuing."></form-msg>
  </div>

  <div class="form-footer">
    <div></div>
    <btn
      type="submit"
      icon="angle-right"
      icon-pos="right"
      value="Continue">
    </btn>
  </div>

</form>
</template>

<script>
import dummyWallet from '../store/json/dummyWallet.json'
import FileSaver from 'file-saver'
import FormMsg from '@nylira/vue-form-msg'
import Btn from '@nylira/vue-button'
export default {
  name: 'fund-btc-03',
  components: {
    Btn,
    FormMsg
  },
  data () {
    return {
      downloadClicked: false
    }
  },
  methods: {
    downloadWallet () {
      let walletString = JSON.stringify(dummyWallet)
      let walletArray = walletString.split('')
      // eslint-disable-next-line
      let blob = new Blob(walletArray, {type: 'text/plain;charset=utf-8'})
      FileSaver.saveAs(blob, 'dummy-atom-wallet.json')

      this.downloadClicked = true
    },
    nextStep () {
      if (!this.downloadClicked) {
        document.querySelector('#form-group-download').classList.add('form-group-error')
        return
      }
      this.$store.commit('setBtcTransactionProgress', 4)
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
</script>
