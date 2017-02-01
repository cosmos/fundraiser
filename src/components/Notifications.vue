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
  z-index 1000

  display flex
  flex-flow column nowrap
  align-items stretch

  width 100vw

.pz-notification
  margin-bottom 0.5rem
  &:last-of-type
    margin-bottom 0

@media screen and (min-width:720px)
  .pz-notifications
    max-width 24rem
</style>
