<template>
  <modal v-if="!isValidBrowser">
    <div slot="title"><i class="fa fa-warning"></i> Unsupported Web Browser</div>
    <div>The Cosmos Fundraiser does not support Internet Explorer 8 and below. Please update your browser to a modern version of Chrome, Firefox, or Safari.</div>
    <div slot="footer">
      <btn value="Download Mozilla Firefox" @click.native="gotoFirefox"></btn>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'modal-unsupported',
  computed: {
    isValidBrowser () {
      return Object.defineProperty
    }
  }
}
</script>
