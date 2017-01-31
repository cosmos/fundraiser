<template>
  <div class="pz-notification" :class="cssClass" @click="destroySelf">
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
      let value = ''
      switch (this.data.type) {
        case 'error':
          value += 'pz-notification-error'; break
        case 'warning':
          value += 'pz-notification-warning'; break
        default:
          break
      }
      return value
    }
  },
  methods: {
    destroySelf () {
      console.log('destroying myself!')
    }
  },
  mounted () {
    setTimeout(this.destroySelf, 5000)
  },
  props: ['data', 'icon', 'title', 'time', 'body']
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
</style>
