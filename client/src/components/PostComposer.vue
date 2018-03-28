<template>
  <v-layout
    column>
    <v-flex
      xs6
      offset-xs3>
      <panel
        title="New Post">
        <form
          name="compose-form"
          autocomplete="off">
          <v-text-field
            label="A summary of your request"
            v-model="post.title"
          />
          <v-text-field
            label="Describe what exactly you are looking for"
            multi-line
            v-model="post.body"
          />
          <div
            class="error"
            v-html="error"></div>
          <v-btn
            dark
            class="light-blue"
            @click="submit">
            Submit
          </v-btn>
        </form>
        <div
          class="error"
          v-html="error"></div>
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
      post: {
        title: null,
        body: null
      },
      error: null
    }
  },
  components: {
    Panel
  },
  methods: {
    async submit () {
      try {
        await PostService.post(this.post)
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
