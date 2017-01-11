<template>
  <div class="subtitle subtitle-error" v-if="formError.active"> 
    <strong>{{ formError.code }}</strong>
    {{ formError.message }}
  </div>
</template>

<script>
export default {
  props: ['form-error']
}
</script>
