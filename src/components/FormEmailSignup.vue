<template>
  <form action="//network.us14.list-manage.com/subscribe/post?u=1b8aeaa81ca615914eb2eb7fc&amp;id=64c73f9f5f" method="post" name="mc-embedded-subscribe-form" class="form-email-signup validate form" target="_blank" novalidate>

    <div class="input-group">
      <input
        class="input"
        type="email"
        :placeholder="$t('emailSignupForm.emailAddress')"
        id="mce-EMAIL">
      </input>
      <vue-button
        btn-type="submit"
        :btn-value="$t('emailSignupForm.notifyMe')"
        id="mc-embedded-subscribe">
      </vue-button>
    </div>

    <!-- anti-bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true">
      <input type="text" name="b_1b8aeaa81ca615914eb2eb7fc_64c73f9f5f" tabindex="-1" value="">
    </div>
  </form>
</template>

<script>
import VueButton from '@nylira/vue-button'
export default {
  components: {
    VueButton
  }
}
</script>
<style lang="stylus">
@import '../styles/variables.styl'

.form-email-signup
  margin 0
  background transparent
  border none

  .input-group
    display flex
    input
      flex 1
      border-right none
</style>
