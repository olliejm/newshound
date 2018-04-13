<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div
        v-for="post in posts"
        :key="post.id">
        <v-card>
          <v-card-title>
            <v-avatar
              :tile="tile"
              :size="avatarSize"
              class="grey lighten-4"
            >
              <img :src="post.UserId" alt="avatar">
            </v-avatar>
            {{post.title}}
          </v-card-title>
          {{post.body}}
        </v-card>
      </div>
      <div
        class="error"
        v-if="error">
        {{error}}
      </div>
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
