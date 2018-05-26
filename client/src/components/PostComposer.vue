<template>
  <v-layout column>
    <v-flex
      xs6
      offset-xs3>
      <div class="headline">
        New Post</div>
      <form
        name="compose-form"
        autocomplete="off">
        <v-text-field
          label="A summary of your request"
          required
          :rules="[required]"
          v-model="post.title"/>
        <v-text-field
          label="Describe what exactly you are looking for"
          required
          multi-line
          :rules="[required]"
          v-model="post.body"/>
        <v-alert
          v-if="error"
          v-html="error"
          outline
          color="error"
          icon="warning"
          :value="true"/>
        <v-btn
          dark
          class="light-blue"
          @click="submit">
          Submit
        </v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import PostService from '@/services/PostService'

export default {
  data () {
    return {
      post: {
        title: null,
        body: null,
        UserId: this.$store.state.user.id
      },
      error: null,
      required: (value) => !!value || 'Required field.'
    }
  },
  methods: {
    async submit () {
      this.error = null

      if (!Object.keys(this.post).every(key => !!this.post[key])) {
        this.error = 'Please fill in all required fields.'
        return
      }

      try {
        await PostService.post(this.post)
        this.$router.push({
          name: 'browse'
        })
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
