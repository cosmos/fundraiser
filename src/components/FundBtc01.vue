<template>
  <form-struct :submit="nextStep">
    <module-overlay slot="overlay" v-if="!FUNDRAISE_STARTED"></module-overlay>

    <div slot="title">Donate BTC</div>
    <div slot="subtitle">Copy this mnemonic and store it in a secure location. You'll need it to access your atoms later.</div>

    <form-group>
      <label>Write this down.</label>
      <label class="hidden" for="fund-btc-mnemonic">Mnemonic</label>
      <field-group>
        <mnemonic :value="fields.mnemonic"></mnemonic>
      </field-group>
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
import { mapGetters } from 'vuex'
import moment from 'moment'
import Btn from '@nylira/vue-button'
import Field from '@nylira/vue-input'
import FieldGroup from './FieldGroup'
import FormStruct from './FormStruct'
import FormMsg from '@nylira/vue-form-msg'
import FormGroup from './FormGroup'
import Mnemonic from './Mnemonic'
import ModuleOverlay from './ModuleOverlay'
export default {
  name: 'fund-btc-01',
  components: {
    Btn,
    Field,
    FieldGroup,
    FormGroup,
    FormMsg,
    FormStruct,
    Mnemonic,
    ModuleOverlay
  },
  computed: {
    FUNDRAISE_STARTED () {
      return Date.now() >= moment(this.config.START_DATETIME).valueOf()
    },
    ...mapGetters(['sessionUser', 'sessionReady', 'config'])
  },
  data: () => ({
    fields: {
      mnemonic: 'placeholder mnemonic currently here rainbow butter cats tables'
    }
  }),
  methods: {
    nextStep () {
      this.$store.commit('setBtcDonationPrice', this.config.COINS.BTC.EXCHANGE_RATE)
      this.$store.commit('setBtcDonationAtoms', this.fields.atoms)
      this.$store.dispatch('generateBtcDonationWallet', this.fields.mnemonic)
      this.$store.commit('setBtcDonationProgress', 2)
    },
    skipWalletCreation () {
      // we already have a wallet
      let encryptedSeed = this.sessionUser.wallets[0]
      this.$store.commit('setBtcDonationEncryptedSeed', encryptedSeed)
      this.$store.commit('setBtcDonationProgress', 'decrypt')
    },
    skipIfWalletExists () {
      if (this.sessionUser &&
        this.sessionUser.wallets &&
        this.sessionUser.wallets.length > 0) {
        this.skipWalletCreation()
      }
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    let done = this.$store.watch(() => this.sessionReady, () => {
      this.skipIfWalletExists()
      done()
    })
    this.skipIfWalletExists()
  }
}
</script>
