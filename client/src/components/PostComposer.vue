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
            required
            :rules="[required]"
            v-model="post.title"
          />
          <v-text-field
            label="Describe what exactly you are looking for"
            required
            multi-line
            :rules="[required]"
            v-model="post.body"
          />
          <div
            class="alert"
            v-if="error">
          {{error}}
          </div>
          <v-btn
            dark
            class="light-blue"
            @click="submit">
            Submit
          </v-btn>
        </form>
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
        body: null,
        UserId: this.$store.state.user.id
      },
      error: null,
      required: (value) => !!value || 'Required field.'
    }
  },
  components: {
    Panel
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
