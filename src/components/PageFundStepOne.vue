<template>
<form class="form" v-show="fund.progress === 1" v-on:submit.prevent="next($event)">
  <div class="form-header">
    <div class="title">{{ $t('siteFund.stepOne.title') }}</div>
    <div class="subtitle">{{ $t('siteFund.stepOne.subtitle') }}</div>
    <vue-input-error :error="errorObj"></vue-input-error>
  </div>
  <div class="form-group">
    <label for="cf-name">{{ $t('siteFund.stepOne.name') }}</label>
    <div class="input-group">
      <input
        class="cf-name"
        type="text"
        v-model.trim="fund.user.name"
        :placeholder="$t('siteFund.stepOne.name')"
        required>
    </div>
  </div>
  <div class="form-group">
    <label for="cf-email">{{ $t('siteFund.stepOne.email') }}</label>
    <div class="input-group">
      <input
        class="cf-email"
        type="email"
        v-model.trim="fund.user.email"
        :placeholder="$t('siteFund.stepOne.email')"
        required>
    </div>
  </div>
  <div class="form-group">
    <label for="cf-nationality">
      {{ $t('siteFund.stepOne.nationality') }}
    </label>
    <div class="input-group">
      <form-select
        class="cf-nationality"
        :options="allCountries"
        :empty="true"
        :placeholder="$t('siteFund.stepOne.selectCountry')"
        model="fund.user.nationality">
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
import FormSelect from './FormSelect'
import { mapGetters } from 'vuex'
import VueInputError from '@nylira/vue-input-error'
import VueButton from '@nylira/vue-button'
import captureSafariValidation from '../scripts/captureSafariValidation'
export default {
  name: 'page-fund',
  components: {
    FormSelect,
    VueInputError,
    VueButton
  },
  computed: {
    ...mapGetters(['allCountries', 'fund'])
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
      console.log('step 1 done', this.fund)
      this.$store.commit('setFundProgress', 2)
    }
  }
}
</script>
