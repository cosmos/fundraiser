<template>
<div class="page page-narrow page-fund">
  <page-header :title="$t('siteFund.title')" type="center"></page-header>
  <div class="fund-wrapper">
    <page-fund-nav :step="fund.progress"></page-fund-nav>
    <div class="fund-steps">
      <form class="form" v-show="fund.progress === 1" v-on:submit.prevent="goTo(2, $event)">
        <div class="form-header">
          <div class="title">{{ $t('siteFund.stepOne.title') }}</div>
          <div class="subtitle">{{ $t('siteFund.stepOne.subtitle') }}</div>
          <form-error :error="stepOneError"></form-error>
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
          <pz-button btn-type="submit" :btn-value="$t('siteFund.btnContinue')">
          </pz-button>
        </div>
      </form>
      <form class="form" v-if="fund.progress === 2" v-on:submit.prevent="goTo(3, $event)">
        <div class="form-header">
          <div class="title">{{ $t('siteFund.stepTwo.title') }}</div>
          <div class="subtitle">{{ $t('siteFund.stepTwo.subtitle') }}</div>
          <form-error :error="stepTwoError"></form-error>
        </div>
        <div class="form-group">
          <label>{{ $t('siteFund.stepTwo.generatePublicKey') }}</label>
          <div class="input-group">
            <div></div>
            <pz-button btn-type="submit" btn-icon="key"
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
          <pz-button btn-type="submit" :btn-value="$t('siteFund.btnContinue')">
          </pz-button>
        </div>
      </form>
      <form class="form" v-if="fund.progress === 3" v-on:submit.prevent="goTo(4, $event)">
        <div class="form-header">
          <div class="title">{{ $t('siteFund.stepThree.title') }}</div>
          <div class="subtitle">{{ $t('siteFund.stepThree.subtitle') }}</div>
          <form-error :error="stepThreeError"></form-error>
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
          <pz-button btn-type="submit" :btn-value="$t('siteFund.btnContinue')">
          </pz-button>
        </div>
      </form>
      <form class="form" v-if="fund.progress === 4" v-on:submit.prevent="goHome">
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
    </div>
  </div>
</div>
</template>

<script>
import PageHeader from './PageHeader'
import PageFundNav from './PageFundNav'
import FormError from './FormError'
import FormSelect from './FormSelect'
import { mapGetters } from 'vuex'
import PzButton from './PzButton'
import captureSafariValidation from '../scripts/captureSafariValidation'
export default {
  name: 'page-fund',
  components: {
    PageHeader,
    PageFundNav,
    FormSelect,
    FormError,
    PzButton
  },
  computed: {
    ...mapGetters(['allCountries', 'fund'])
  },
  data () {
    return {
      stepOneError: {
        active: false,
        code: 'Error:',
        message: ''
      },
      stepTwoError: {
        active: false,
        code: 'Error:',
        message: ''
      },
      stepThreeError: {
        active: false,
        code: 'Error:',
        message: ''
      }
    }
  },
  methods: {
    goTo (step, event) {
      if (!event.target.checkValidity()) {
        // console.log('browser is an older version of Safari')

        event.preventDefault()
        let inputs = document.querySelectorAll(
          'input[required], select[required], textarea[required]')

        let errorObj = this.stepOneError

        captureSafariValidation(inputs, errorObj)
        return false
      }
      this.fund.progress = step
    },
    goHome () { this.$router.push('/') }
  },
  mounted () {
    document.title = 'Purchase Atoms - Cosmos'
    let highlights = document.querySelectorAll('.highlight-on-focus')
    Array.from(highlights).map(function (el) {
      el.addEventListener('click', function () { this.select() })
    })
  }
}
</script>

<style lang="stylus">
.page-fund .page-header
  border-bottom none
</style>
