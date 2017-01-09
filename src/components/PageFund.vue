<template>
<div class="page page-narrow">
  <page-header :title="$t('siteFund.title')" type="center"></page-header>
  <div class="fund-wrapper">
    <page-fund-nav :step="step"></page-fund-nav>
    <div class="fund-steps">
      <form class="form" v-show="step === 1" v-on:submit.prevent="goTo(2, $event)">
        <div class="form-header">
          <div class="title">{{ $t('siteFund.stepOne.title') }}</div>
          <div class="subtitle">{{ $t('siteFund.stepOne.subtitle') }}</div>
        </div>
        <div class="form-group">
          <label for="cf-name">{{ $t('siteFund.stepOne.name') }}</label>
          <div class="input-group">
            <input
              class="cf-name"
              type="text"
              v-model.trim="user.name"
              :placeholder="$t('siteFund.stepOne.name')"
              required

            >
          </div>
        </div>
        <div class="form-group">
          <label for="cf-email">{{ $t('siteFund.stepOne.email') }}</label>
          <div class="input-group">
            <input
              class="cf-email"
              type="email"
              v-model.trim="user.email"
              :placeholder="$t('siteFund.stepOne.email')"
              required
            >
          </div>
        </div>
        <div class="form-group">
          <label for="cf-nationality">{{ $t('siteFund.stepOne.nationality') }}</label>
          <div class="input-group">
            <form-select
              class="cf-nationality"
              :options="allCountries"
              :empty="true"
              :model="user.nationality"
            >
          </div>
        </div>
        <div class="form-footer">
          <input type="submit" class="btn" :value="$t('siteFund.btnContinue')">
        </div>
      </form>
      <form class="form" v-if="step === 2" v-on:submit.prevent="goTo(3, $event)">
        <div class="form-header">
          <div class="title">{{ $t('siteFund.stepTwo.title') }}</div>
          <div class="subtitle">{{ $t('siteFund.stepTwo.subtitle') }}</div>
        </div>
        <div class="form-group">
          <label>{{ $t('siteFund.stepTwo.generatePublicKey') }}</label>
          <div class="input-group">
            <a class="btn" target="_blank" href="https://google.com">
              <i class="fa fa-key"></i>
              <span class="text">{{ $t('siteFund.stepTwo.launchKeygen') }}</span>
            </a>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t('siteFund.stepTwo.pastePublicKey') }}</label>
          <div class="input-group">
            <textarea class="cf-pubkey" required></textarea>
          </div>
        </div>
        <div class="form-footer">
          <input type="submit" class="btn" :value="$t('siteFund.btnContinue')">
        </div>
      </form>
      <form class="form" v-if="step === 3" v-on:submit.prevent="goTo(4, $event)">
        <div class="form-header">
          <div class="title">{{ $t('siteFund.stepThree.title') }}</div>
          <div class="subtitle">{{ $t('siteFund.stepThree.subtitle') }}</div>
        </div>
        <div class="form-group">
          <label>{{ $t('siteFund.stepThree.atomCount') }}</label>
          <div class="input-group">
            <input class="highlight-on-focus cf-atoms" type="number" v-model="user.atoms" required min="1" max="1000000">
            <div class="input-group-addon">Atoms</div>
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t('siteFund.stepThree.btcPrice') }}</label>
          <div class="input-group">
            <input class="highlight-on-focus" type="number" disabled :value="bitcoinPrice">
            <div class="input-group-addon">BTC</div>
          </div>
        </div>
        <div class="form-footer">
          <input type="submit" class="btn" :value="$t('siteFund.btnContinue')">
        </div>
      </form>
      <form class="form" v-if="step === 4" v-on:submit.prevent="goHome">
        <div class="form-header">
          <div class="title">{{ $t('siteFund.stepFour.title') }}</div>
          <div class="subtitle">{{ $t('siteFund.stepFour.subtitle') }}</div>
        </div>
        <div class="form-group">
          <label>{{ $t('siteFund.stepFour.depositAddress') }}</label>
          <div class="input-group">
            <input class="highlight-on-focus" type="text" :value="bitcoinAddress">
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t('siteFund.stepFour.totalPrice') }}</label>
          <div class="input-group">
            <input class="highlight-on-focus" type="number" disabled :value="bitcoinPrice">
            <div class="input-group-addon">BTC</div>
          </div>
        </div>
        <div class="form-footer">
          <input type="submit" class="btn" :value="$t('siteFund.btnFinished')">
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import PageHeader from './PageHeader'
import PageFundNav from './PageFundNav'
import FormSelect from './FormSelect'
import { mapGetters } from 'vuex'
export default {
  name: 'page-fund',
  components: {
    PageHeader,
    PageFundNav,
    FormSelect
  },
  computed: {
    bitcoinPrice () {
      return this.user.atoms / 27394
    },
    ...mapGetters([
      'allCountries'
    ])
  },
  data () {
    return {
      step: 1,
      bitcoinAddress: '1NAfx5GEZHR8t69LjxTeShPP4XXaxeUqQw',
      user: {
        name: '',
        email: '',
        nationality: '',
        publicKey: '',
        atoms: 1000
      }
    }
  },
  methods: {
    goTo (step, event) {
      if (!event.target.checkValidity()) {
        // console.log('I am Safari!')
        event.preventDefault()

        let inputs = document.querySelectorAll('input[required], select[required], textarea[required]')
        // console.log('inputs[required]', inputs)

        for (let i = 0; i < inputs.length; i++) {
          let input = inputs[i]

          if (!input.validity.valid) {
            let ph
            if (input.classList.contains('cf-name')) {
              ph = this.$t('siteFund.stepOne.nameInvalid')
            }
            if (input.classList.contains('cf-email')) {
              ph = this.$t('siteFund.stepOne.emailInvalid')
            }
            if (input.classList.contains('cf-pubkey')) {
              ph = this.$t('siteFund.stepTwo.pastePublicKeyInvalid')
            }
            if (input.classList.contains('cf-atoms')) {
              ph = this.$t('siteFund.stepThree.atomCountInvalid')
            }

            // console.log(input.className, 'is invalid')

            input.focus()
            input.placeholder = ph
            input.value = ''
            return false
          }
        }
        return
      }
      this.step = step
    },
    goHome () {
      this.$router.push('/')
    }
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
@import '../styles/variables.styl'

.page-fund
  .fund-wrapper
    max-width 32rem
    margin 0 auto

.fund-steps
  position relative

  .form-nav-progress
    position absolute
    top -1px
    right -1px
</style>
