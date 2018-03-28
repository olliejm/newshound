<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Posts">
        <div
          v-for="post in posts"
          :key="post.id">
          {{post.title}} -
          {{post.body}}
        </div>
        <div
          class="error"
          v-html="error">
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import PostService from '@/services/PostService'
import Panel from '@/components/Panel.vue'

export default {
  data () {
    return {
      posts: [],
      error: null
    }
  },
  components: {
    Panel
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
