<template>
  <div>
    <h1>{{title}}</h1>
    <div>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style scoped>
</style>
