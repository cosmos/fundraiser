<template>
  <modal class="modal-agreement">
    <div slot="title">Contribution Terms</div>
    <p>You must agree to the contribution terms agreement before starting the donation.</p>
    <btn
      @click.native="openTerms"
      size="lg"
      icon="download"
      value="Download Agreement">
    </btn>
    <div slot="footer">
      <btn value="Cancel" @click.native="no"></btn>
      <btn value="I Agree" @click.native="yes"></btn>
    </div>
  </modal>
</template>

<script>
import { mapGetters } from 'vuex'
import Btn from '@nylira/vue-button'
import Modal from './Modal'
import ArticleBody from '@nylira/vue-article-body'
export default {
  name: 'modal-agreement',
  components: {
    Btn,
    Modal,
    ArticleBody
  },
  computed: {
    ...mapGetters(['docs'])
  },
  methods: {
    openTerms () {
      window.location.href = this.docs.terms
    },
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
