<template>
  <div class="ni-notifications">
    <notification
      v-for="notification in notifications"
      :data="notification"
      :color="color"
    >
    </notification>
  </div>
</template>

<script>
import Notification from './Notification'
export default {
  name: 'ni-notifications',
  components: {
    Notification
  },
  props: ['notifications', 'color']
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.ni-notifications
  position fixed
  top 0
  right 0
  z-index 1000

  display flex
  flex-flow column nowrap
  align-items stretch

  width 100vw

.ni-notification
  margin-bottom 0.5rem
  &:last-of-type
    margin-bottom 0

@media screen and (min-width:720px)
  .ni-notifications
    max-width 30rem
</style>
