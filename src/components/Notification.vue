<template>
  <div class="pz-notification" :class="cssClass" @click="deactivate" v-if="active">
    <header>
      <i :class="'icon fa fa-' + data.icon" v-if="data.icon"></i>
      <div class="title" v-if="data.title">{{ data.title }}</div>
      <menu>
        <div class="time" v-if="data.time">{{ fromNow }}</div>
        <i class="close fa fa-times-circle"></i>
      </menu>
    </header>
    <div class="body">{{ data.body }}</div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'pz-notification',
  computed: {
    fromNow () {
      return moment(this.data.time).fromNow()
    },
    cssClass () {
      if (this.data.type) return `pz-notification-${this.data.type}`
      else return 'pz-notification-default'
    }
  },
  data () {
    return {
      duration: 3000,
      active: true
    }
  },
  methods: {
    deactivate () {
      // console.log('destroying myself!')
      this.active = false
    },
    setDeactivation () {
      if (!this.data.layout || this.data.layout === 'banner') {
        // notification active duration is 5 seconds - (time since creation)
        let activeDuration = this.duration - (Date.now() - this.data.time)

        // disable visibility if it's an old notification
        if (activeDuration < 0) {
          this.active = false
          return
        }

        // otherwise self destruct after duration
        setTimeout(this.deactivate, activeDuration)
      }
    }
  },
  mounted () {
    this.setDeactivation()
  },
  props: ['data']
}
</script>

<style lang="stylus">
@import '../styles/variables.styl'

.pz-notification
  background c-app-bg
  box-shadow hsla(0,0,0,0.33) 0 0.125rem 0.25rem
  font-size 0.75rem

  cursor pointer
  user-select none
  margin 0.5rem 0.5rem 0

  header
    display flex
    align-items center
    padding 0 0.375rem
    height 2em
    background lighten(link, 20%)
    
    .icon
      padding-right 0.25rem
      color c-app-fg

    .title
      flex 1
      font-weight 500
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      padding-right 0.375rem
      color c-app-fg

    .time, .close
      color hsla(0,0,100%,0.75)

    menu
      .close
        display none

  .body
    padding 0.375rem
  &:hover
    menu
      .time
        display none
      .close
        display block

  &.pz-notification-warn
    header
      background hsl(30,100%,50%)

  &.pz-notification-error
    header
      background hsl(0,100%,50%)

@media screen and (min-width: 360px)
  .pz-notification
    font-size 0.875rem
    margin 0.625rem 0.625rem 0

    header
      padding 0 0.5rem

    .body
      padding 0 0.5rem

@media screen and (min-width: 400px)
  .pz-notification
    margin 0.75rem 0.75rem 0

    header
      padding 0 0.75rem

    .body
      padding 0.75rem

@media screen and (min-width: 720px)
  .pz-notification
    margin 1rem 1rem 0
</style>
