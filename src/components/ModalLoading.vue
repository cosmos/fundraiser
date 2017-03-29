<template>
  <modal icon="refresh">
    <div slot="title">Loading&hellip;</div>
    <p>Please wait a moment while data is being loaded.</p>
    <div slot="footer">
      <btn disabled value="Processing..."></btn>
    </div>
  </modal>
</template>

<script>
import Btn from '@nylira/vue-button'
import Modal from './Modal'
export default {
  name: 'modal-loading',
  components: {
    Btn,
    Modal
  }
}
</script>
