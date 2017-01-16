<template>
  <div class="pz-countdown">
    <div class="block">
      <div class="value">{{ twoDigits(days) }}</div>
      <div class="unit">Days</div>
    </div>
    <div class="block">
      <div class="value">{{ twoDigits(hours) }}</div>
      <div class="unit">Hours</div>
    </div>
    <div class="block">
      <div class="value">{{ twoDigits(minutes) }}</div>
      <div class="unit">Minutes</div>
    </div>
    <div class="block">
      <div class="value">{{ twoDigits(seconds) }}</div>
      <div class="unit">Seconds</div>
    </div>
  </div>
</template>

<script>
export default {
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
  methods: {
    twoDigits (number) {
      if (number < 10) return '0' + number
      else return number
    }
  },
  mounted () {
    window.setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000)
    }, 1000)
  },
  props: ['date']
}

</script>
<style lang="stylus">
.pz-countdown
  display flex
  width 100%
  max-width 25em

  .block
    flex 1
    padding 0.5em 0 1em
    text-align center

  .value
    margin-bottom 0.5em

    font-size 2em
    font-weight 200
    color #000

  .unit
    font-size 0.75em
    font-weight 400
    color #999

@media screen and (min-width: 360px)
  .pz-countdown
    .value
      font-size 2.25em
    .unit
      font-size 0.85em

@media screen and (min-width: 360px)
  .pz-countdown
    .value
      font-size 2.5em
    .unit
      font-size 0.9375em
</style>
