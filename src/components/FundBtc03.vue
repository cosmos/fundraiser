<template>
  <form-struct :submit="nextStep">
    <div slot="title">Donate BTC</div>
    <div slot="subtitle">Step 3 - Download your presale atom wallet.</div>

    <form-group id="form-group-download">
      <field-group>
        <btn
          @click.native="downloadWallet"
          icon="download"
          value="Download Wallet">
        </btn>
      </field-group>
      <form-msg body="If the wallet opens in a browser window, copy and paste the contents into a text file."></form-msg>
      <form-msg type="error" body="You must download the wallet file before continuing."></form-msg>
    </form-group>

    <btn
      slot="submit"
      type="submit"
      icon="angle-right"
      icon-pos="right"
      value="Continue">
    </btn>
  </form>
</template>

<script>
import dummyWallet from '../store/json/dummyWallet.json'
import FileSaver from 'file-saver'
import FormMsg from '@nylira/vue-form-msg'
import FormStruct from './FormStruct'
import FormGroup from './FormGroup'
import Btn from '@nylira/vue-button'
import FieldGroup from './FieldGroup'
export default {
  name: 'fund-btc-03',
  components: {
    FormStruct,
    FormGroup,
    FormMsg,
    Btn,
    FieldGroup
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
        document.querySelector('#form-group-download').classList.add('error')
        return
      }
      this.$store.commit('setBtcDonationProgress', 4)
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
</script>
