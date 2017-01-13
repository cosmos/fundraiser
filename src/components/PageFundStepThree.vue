<template>
<form class="form" v-if="fund.progress === 3" v-on:submit.prevent="next($event)">
  <div class="form-header">
    <div class="title">{{ $t('siteFund.stepThree.title') }}</div>
    <div class="subtitle">{{ $t('siteFund.stepThree.subtitle') }}</div>
    <form-error :error="errorObj"></form-error>
  </div>
  <div class="form-group">
    <label>{{ $t('siteFund.stepThree.atomCount') }}</label>
    <div class="input-group">
      <input
        class="highlight-on-focus cf-atoms"
        type="number"
        v-model="fund.atoms"
        required min="1"
        max="1000000">
      <div class="input-group-addon">Atoms</div>
    </div>
  </div>
  <div class="form-group">
    <label>{{ $t('siteFund.stepThree.btcPrice') }}</label>
    <div class="input-group">
      <input class="highlight-on-focus" type="number"
        disabled :value="fund.atoms * fund.btcCost">
      <div class="input-group-addon">BTC</div>
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
    next (event) {
      // console.log('browser is an older version of Safari')
      if (!event.target.checkValidity()) {
        event.preventDefault()
        let inputs = document.querySelectorAll(
          'input[required], select[required], textarea[required]')
        captureSafariValidation(inputs, this.errorObj)
        return false
      }
      console.log('step 3 done', this.fund)
      this.$store.commit('setFundProgress', 4)
    }
  }
}
</script>
