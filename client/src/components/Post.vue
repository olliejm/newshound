<template>
  <panel :title="title">
    <p>{{body}}</p>
    <v-btn>
      {{user}}
    </v-btn>
  </panel>
</template>

<script>
import Panel from '@/components/Panel.vue'

export default {
  components: {
    Panel
  },
  name: 'post',
  props: [
    'title',
    'body',
    'user'
  ]
}
</script>

<style scoped>

</style>
