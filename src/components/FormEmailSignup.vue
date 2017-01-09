<template>
  <form action="//network.us14.list-manage.com/subscribe/post?u=1b8aeaa81ca615914eb2eb7fc&amp;id=64c73f9f5f" method="post" name="mc-embedded-subscribe-form" class="form-email-signup validate form" target="_blank" novalidate>

    <ipt ipt-type="email" :ipt-placeholder="$t('emailSignupForm.emailAddress')" id="mce-EMAIL"></ipt>

    <btn btn-type="submit" :btn-value="$t('emailSignupForm.notifyMe')" id="mc-embedded-subscribe"></btn>

    <!-- anti-bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_1b8aeaa81ca615914eb2eb7fc_64c73f9f5f" tabindex="-1" value=""></div>
  </form>
</template>

<script>
import Btn from './FormBtn'
import Ipt from './FormInput'
export default {
  components: {
    Btn,
    Ipt
  }
}
</script>
<style lang="stylus">
@import '../styles/variables.styl'

.form.form-email-signup
  margin 0
  background transparent
  border none

  input[type="email"]
    margin 0 0 0.5rem
</style>
