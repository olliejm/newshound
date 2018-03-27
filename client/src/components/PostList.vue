<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Posts">
        <div
          v-for="post in posts"
          class="post"
          :key="post.id">
          <post
            :title="post.title"
            :body="post.body"
            :user="post.user"/>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import PostService from '@/services/PostService'
import Panel from '@/components/Panel.vue'
import Post from '@/components/Post.vue'

export default {
  components: {
    Panel,
    Post
  },
  name: 'posts',
  data () {
    return {
      posts: [
        {
          title: 'Post Title',
          body: 'Post Body',
          user: this.$store.state.user.email
        }
      ],
      error: null
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      try {
        const response = await PostService.getPosts()
        this.posts = response.data
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<style scoped>

</style>
