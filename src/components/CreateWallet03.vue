<template>
  <form-struct :submit="nextStep">
    <div slot="title">Donate</div>
    <div slot="subtitle">Backup your Atom wallet</div>

    <form-group id="form-group-download">
      <label>Download Encrypted Wallet File</label>
      <field-group>
        <btn
          @click.native="downloadWallet"
          icon="download"
          value="Download Wallet">
        </btn>
      </field-group>
      <form-msg body="You will use this wallet later to access your Cosmos Atoms."></form-msg>
      <form-msg type="error" body="You must download the wallet file before continuing."></form-msg>
    </form-group>

    <form-group :class="{ 'error': $v.emailAddress.$error || $v.emailAddressConfirm.$error }">
      <label for="create-wallet-email-address">Email Address</label>
      <field-group>
      <field
        id="create-wallet-email-address"
        type="text"
        placeholder="Enter your email address"
        v-model="emailAddress"
        required>
      </field>
      </field-group>
      <form-msg name="Email Address" type="required" v-if="!$v.emailAddress.required">X</form-msg>

      <field-group>
      <field
        id="create-wallet-email-address-confirm"
        type="text"
        placeholder="Re-enter your email address"
        v-model="emailAddressConfirm"
        required>
      </field>
      </field-group>
      <form-msg name="Email Address Confirmation" type="required" v-if="!$v.emailAddressConfirm.required">X</form-msg>

      <form-msg body="A copy of your encrypted wallet will be sent to this email as a backup."></form-msg>
      <form-msg body="We will NOT store your email address or share it with third-parties."></form-msg>
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
import { required, sameAs } from 'vuelidate/lib/validators'
import FileSaver from 'file-saver'
import cfr from 'cosmos-fundraiser'
import FormMsg from '@nylira/vue-form-msg'
import FormStruct from './FormStruct'
import FormGroup from './FormGroup'
import Btn from '@nylira/vue-button'
import FieldGroup from './FieldGroup'
import Field from '@nylira/vue-input'
export default {
  name: 'create-wallet-03',
  components: {
    FormStruct,
    FormGroup,
    Field,
    FormMsg,
    Btn,
    FieldGroup
  },
  data () {
    return {
      downloadClicked: false,
      emailAddress: '',
      emailAddressConfirm: ''
    }
  },
  computed: {
    ...mapGetters(['donation'])
  },
  methods: {
    downloadWallet () {
      let { encryptedSeed } = this.donation
      let walletBytes = cfr.encodeWallet(encryptedSeed)
      // eslint-disable-next-line
      let blob = new Blob([ walletBytes.buffer ], { type: 'application/octet-stream' })
      FileSaver.saveAs(blob, 'cosmos_fundraiser.wallet')
      this.downloadClicked = true
    },
    nextStep () {
      if (!this.downloadClicked) {
        document.querySelector('#form-group-download').classList.add('error')
        return
      } else {
        document.querySelector('#form-group-download').classList.remove('error')
      }
      this.$v.$touch()
      if (this.$v.$error) return
      this.$store.dispatch('emailDonationWallet', {
        emailAddress: this.emailAddress,
        cb: (err) => {
          if (err) return
          this.$store.commit('setDonationProgress', 4)
        }
      })
    }
  },
  validations: {
    emailAddress: {
      required
    },
    emailAddressConfirm: {
      required,
      sameAsEmail: sameAs('emailAddress')
    }
  },
  mounted () {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

#form-group-download
  padding-top 1rem
</style>
