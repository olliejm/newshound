<template>
  <v-layout column>
    <v-flex></v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import PostList from '@/components/PostList.vue'
import PostComposer from '@/components/PostComposer.vue'

export default {
  components: {
    Panel,
    Register,
    Login,
    PostList,
    PostComposer
  }
}
</script>

<style scoped>
</style>
