<template>
  <key-value class="ni-time-remaining" :title="date" v-if="days > 0">
    <div slot="value">{{ days }} day<template v-if="days > 1">s</template></div>
    <div slot="key">{{ label }}</div>
  </key-value>
  <key-value class="ni-time-remaining" :title="date" v-else-if="hours > 0">
    <div slot="value">{{ hours }} hour<template v-if="hours > 1">s</template></div>
    <div slot="key">{{ label }}</div>
  </key-value>
  <key-value class="ni-time-remaining" :title="date" v-else-if="minutes > 0">
    <div slot="value">{{ minutes }} minute<template v-if="minutes > 1">s</template></div>
    <div slot="key">{{ label }}</div>
  </key-value>
  <key-value class="ni-time-remaining" :title="date" v-else-if="seconds > 0">
    <div slot="value">{{ seconds }} second<template v-if="seconds > 1">s</template></div>
    <div slot="key">{{ label }}</div>
  </key-value>
  <key-value class="ni-time-remaining" :title="date" v-else-if="type === 'cap'">
    <div slot="value">--</div>
    <div slot="key">hidden cap ended</div>
    {{ started }}
  </key-value>
  <key-value class="ni-time-remaining" :title="date" v-else>
    <div slot="value"><i class="fa fa-hourglass-end"></i></div>
    <div slot="key">fundraise ended</div>
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
    label () {
      if (this.started) {
        if (this.type === 'cap') return 'left of hidden cap'
        else return 'left'
      } else {
        if (this.type === 'cap') return 'til start of hidden cap'
        else return 'til start'
      }
    },
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
    window.setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000)
    }, 1000)
  },
  props: ['date', 'started', 'type']
}
</script>
