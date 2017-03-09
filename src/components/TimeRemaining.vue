<template>
  <key-value class="ni-time-remaining" :title="date" v-if="days > 0">
    <div slot="value">{{ days }}</div>
    <div slot="key">days to go</div>
  </key-value>
  <key-value class="ni-time-remaining" :title="date" v-else-if="hours > 0">
    <div slot="value">{{ hours }}</div>
    <div slot="key">hours to go</div>
  </key-value>
  <key-value class="ni-time-remaining" :title="date" v-else-if="minutes > 0">
    <div slot="value">{{ minutes }}</div>
    <div slot="key">minutes to go</div>
  </key-value>
  <key-value class="ni-time-remaining" :title="date" v-else-if="seconds > 0">
    <div slot="value">{{ seconds }}</div>
    <div slot="key">seconds to go</div>
  </key-value>
  <key-value class="ni-time-remaining" :title="date" v-else>
    <div slot="value"><i class="fa fa-hourglass-end"></i></div>
    <div slot="key">fundraise is over</div>
  </key-value>
</template>

<script>
import KeyValue from './KeyValue'
export default {
  name: 'ni-time-remaining',
  components: {
    KeyValue
  },
  computed: {
    usableDate () {
      return Math.trunc(Date.parse(this.date) / 1000)
    },
    seconds () {
      return (this.usableDate - this.now) % 60
    },
    minutes () {
      return Math.trunc((this.usableDate - this.now) / 60) % 60
    },
    hours () {
      return Math.trunc((this.usableDate - this.now) / 60 / 60) % 24
    },
    days () {
      return Math.trunc((this.usableDate - this.now) / 60 / 60 / 24)
    }
  },
  data () {
    return {
      now: Math.trunc((new Date()).getTime() / 1000)
    }
  },
  mounted () {
    console.log(this.date)
    window.setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000)
    }, 1000)
  },
  props: ['date']
}
</script>
