<template>
  <v-layout column>
    <v-flex></v-flex>
  </v-layout>
</template>

<script>
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import PostList from '@/components/PostList.vue'
import PostComposer from '@/components/PostComposer.vue'

export default {
  components: {
    Register,
    Login,
    PostList,
    PostComposer
  }
}
</script>

<style scoped>
</style>
