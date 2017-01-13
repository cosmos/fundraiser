<template>
<form class="form" v-if="fund.progress === 4" v-on:submit.prevent="next">
  <div class="form-header">
    <div class="title">{{ $t('siteFund.stepFour.title') }}</div>
    <div class="subtitle">{{ $t('siteFund.stepFour.subtitle') }}</div>
    <form-error error="stepFourError"></form-error>
  </div>
  <div class="form-group">
    <label>{{ $t('siteFund.stepFour.depositAddress') }}</label>
    <div class="input-group">
      <input class="highlight-on-focus" type="text" :value="fund.btcAddress">
    </div>
  </div>
  <div class="form-group">
    <label>{{ $t('siteFund.stepFour.totalPrice') }}</label>
    <div class="input-group">
      <input class="highlight-on-focus"
        type="number" disabled :value="fund.atoms * fund.btcCost">
      <div class="input-group-addon">BTC</div>
    </div>
  </div>
  <div class="form-footer">
    <div></div>
    <pz-button btn-type="submit" :btn-value="$t('siteFund.btnFinished')">
    </pz-button>
  </div>
</form>
</template>

<script>
import FormError from './FormError'
import { mapGetters } from 'vuex'
import PzButton from './PzButton'
export default {
  name: 'page-fund',
  components: {
    FormError,
    PzButton
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
    next () {
      console.log('step 4 done', this.fund)
      this.$router.push('/')
    }
  }
}
</script>
