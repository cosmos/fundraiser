<template>
  <key-value class="ni-time-remaining" :title="date" v-if="countingDown">
    <div slot="value">
      <template v-if="days > 0">{{ days }}d</template>
      <template v-if="hours > 0">{{ hours }}h</template>
      <template v-if="minutes > 0">{{ minutes }}m</template>
      <template v-if="seconds > 0">{{ seconds }}s</template>
    </div>
    <div slot="key">{{ label }}</div>
  </key-value>
  <key-value class="ni-time-remaining" :title="date" v-else-if="type === 'cap'">
    <div slot="value">
      --
    </div>
    <div slot="key">hidden cap ended</div>
    {{ started }}
  </key-value>
  <key-value class="ni-time-remaining" :title="date" v-else>
    <div slot="value">
      <i class="fa fa-hourglass-end"></i>
    </div>
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
    countingDown () {
      return this.days > 0 || this.hours > 0 || this.minutes > 0 || this.seconds > 0
    },
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
