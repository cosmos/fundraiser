<template>
  <btn
    class="btn-copy"
    icon="copy"
    @click.native="click"
    :data-clipboard-text="value"
    :value="label">
  </btn>
</template>

<script>
/* eslint-disable no-new */
import Clipboard from 'clipboard'
import Btn from '@nylira/vue-button'
export default {
  components: {
    Btn
  },
  computed: {
    label () {
      if (this.key) return this.key
      return 'Copy'
    }
  },
  methods: {
    trunc (value) {
      if (value.length > 20) value = this.value.substring(0, 10) + '...'
      return '“' + value + '”'
    },
    click () {
      this.$store.commit('notifyCustom', {
        title: 'Copy Success!',
        body: `${this.trunc(this.value)} has been copied to your clipboard.`
      })
    }
  },
  mounted () {
    new Clipboard('.btn-copy')
  },
  props: ['value']
}
</script>
