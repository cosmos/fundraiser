<template>
  <form-struct :submit="nextStep">
    <module-overlay slot="overlay" v-if="!fundraiserActive"></module-overlay>

    <div slot="title">Donate {{ donation.currency }}</div>
    <div slot="subtitle">Enter a pre-existing mnemonic</div>

    <form-group>
      <label>Mnemonic</label>
      <label class="hidden" for="create-wallet-mnemonic">Mnemonic</label>
      <field-group>
        <field
          id="create-wallet-recall-mnemonic"
          type="textarea"
          placeholder="Enter your mnemonic"
          v-model="mnemonicValue"
          required>
        </field>
      </field-group>
    </form-group>

    <btn
      @click.native="startOver"
      slot="reset"
      value="Reset">
    </btn>

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
import cfr from 'cosmos-fundraiser'
import Btn from '@nylira/vue-button'
import Field from '@nylira/vue-input'
import FieldGroup from './FieldGroup'
import FormGroup from './FormGroup'
import FormStruct from './FormStruct'
import Mnemonic from './Mnemonic'
import ModuleOverlay from './ModuleOverlay'
export default {
  name: 'input-wallet',
  components: {
    Btn,
    Field,
    FieldGroup,
    FormGroup,
    FormStruct,
    Mnemonic,
    ModuleOverlay
  },
  computed: {
    fundraiserActive () {
      console.log('started/ended', this.fundraiserStarted, this.fundraiserEnded)
      return this.fundraiserStarted && !this.fundraiserEnded
    },
    ...mapGetters(['config', 'donation'])
  },
  data: () => ({
    fundraiserStarted: false,
    mnemonicValue: ''
  }),
  methods: {
    startOver () {
      this.$store.commit('setDonationProgress', 1)
    },
    nextStep () {
      this.$store.dispatch('setDonationMnemonicAndWallet', this.mnemonicValue)
      this.$store.commit('setDonationProgress', 3)
    },
    watchFundraiserStart () {
      let self = this
      cfr.ethereum.fetchIsActive('', function (err, res) {
        if (err) return
        if (res === 1) self.fundraiserStarted = true
        else self.fundraiserStarted = false
        // console.log('this.fundraiserStarted', self.fundraiserStarted)
      })
    }
  },
  mounted () {
    this.watchFundraiserStart()
    setInterval(() => this.watchFundraiserStart(), 1000)

    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
</script>
