<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <post
        v-for="post in posts"
        :key="post.id"
        :post="post"/>
      <v-alert
        v-if="error"
        outline
        color="error"
        icon="warning"
        :value="true">
        {{error}}
      </v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
import PostService from '@/services/PostService'
import Post from '@/components/Post.vue'

export default {
  data () {
    return {
      posts: [],
      error: null
    }
  },
  components: {
    Post
  },
  async mounted () {
    try {
      this.posts = (await PostService.index()).data
    } catch (err) {
      this.error = err.response.data.error
    }
  }
}
</script>

<style scoped>
</style>
