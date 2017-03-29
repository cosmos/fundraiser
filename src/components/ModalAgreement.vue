<template>
  <modal size="fs">
    <div slot="title">Fundraiser Agreement</div>
    <article-body>
      <fundraiser-agreement></fundraiser-agreement>
    </article-body>
    <div slot="footer">
      <btn value="Cancel" @click.native="no"></btn>
      <btn value="Agree" @click.native="yes"></btn>
    </div>
  </modal>
</template>

<script>
import Btn from '@nylira/vue-button'
import Modal from './Modal'
import FundraiserAgreement from '../../content/fundraiser-agreement.md'
import ArticleBody from '@nylira/vue-article-body'
export default {
  name: 'modal-agreement',
  components: {
    Btn,
    Modal,
    FundraiserAgreement,
    ArticleBody
  },
  methods: {
    yes () {
      this.$store.commit('setDonationAgreed', true)
    },
    no (value) {
      this.$store.commit('setDonationAgreed', false)
      this.$router.push('/')
    }
  }
}
</script>
