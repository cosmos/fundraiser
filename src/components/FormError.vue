<template>
  <div class="subtitle subtitle-error" v-if="error.active"> 
    <strong>{{ error.code }}</strong>
    {{ error.message }}
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
