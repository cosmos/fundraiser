<template>
  <div class="pz-notifications">
    <notification
      v-for="notification in notifications"
      :data="notification">
    </notification>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Notification from './Notification'
export default {
  name: 'pz-notifications',
  components: {
    Notification
  },
  computed: {
    ...mapGetters(['notifications'])
  }
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.pz-notifications
  position fixed
  top 0
  right 0
  padding 0.5rem
  padding-top 3.5rem
  z-index 1000

  width 100%
  max-width 20rem
  height 100vh

  display flex
  flex-flow column nowrap
  align-items stretch

.pz-notification
  margin-bottom 0.5rem
</style>
