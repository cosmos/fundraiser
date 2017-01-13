<template>
<form class="form" v-if="fund.progress === 2" v-on:submit.prevent="next($event)">
  <div class="form-header">
    <div class="title">{{ $t('siteFund.stepTwo.title') }}</div>
    <div class="subtitle">{{ $t('siteFund.stepTwo.subtitle') }}</div>
    <form-error :error="errorObj"></form-error>
  </div>
  <div class="form-group">
    <label>{{ $t('siteFund.stepTwo.generatePublicKey') }}</label>
    <div class="input-group">
      <pz-button type="button" @click.native="generatePubkey" btn-icon="key"
        :btn-value="$t('siteFund.stepTwo.launchKeygen')">
      </pz-button>
    </div>
  </div>
  <div class="form-group">
    <label>{{ $t('siteFund.stepTwo.pastePublicKey') }}</label>
    <div class="input-group">
      <textarea
        class="cf-pubkey"
        v-model="fund.user.pubkey"
        required>
      </textarea>
    </div>
  </div>
  <div class="form-footer">
    <div></div>
    <vue-button btn-type="submit" :btn-value="$t('siteFund.btnContinue')">
    </vue-button>
  </div>
</form>
</template>

<script>
import FormError from './FormError'
import { mapGetters } from 'vuex'
import VueButton from '@nylira/vue-button'
import captureSafariValidation from '../scripts/captureSafariValidation'
export default {
  name: 'page-fund',
  components: {
    FormError,
    VueButton
  },
  computed: {
    ...mapGetters(['fund'])
  },
  data () {
    return {
      errorObj: {
        active: false,
        code: 'Error:',
        message: ''
      }
    }
  },
  methods: {
    generatePubkey () {
      this.$store.commit('setFundUserPubkey', 'PUBLIC-KEY-WILL-APPEAR-HERE')
    },
    next (event) {
      // console.log('browser is an older version of Safari')
      if (!event.target.checkValidity()) {
        event.preventDefault()
        let inputs = document.querySelectorAll(
          'input[required], select[required], textarea[required]')
        captureSafariValidation(inputs, this.errorObj)
        return false
      }
      console.log('step 2 done', this.fund)
      this.$store.commit('setFundProgress', 3)
    }
  }
}
</script>
