<template>
  <v-flex pa-3>
    <v-card>
      <v-card-title primary-title>
        <v-avatar :size="42">
          <img :src="avatar">
        </v-avatar>
        <v-card-title
          class="headline"
          v-html="post.title"/>
      </v-card-title>
      <v-card-text
        v-html="post.body"
        align="left"
        class="body-1"/>
      <v-list three-line>
        <v-divider/>
        <v-list-tile pa-3>
          <v-list-tile-title class="heading">
            Responses
          </v-list-tile-title>
        </v-list-tile>
        <template v-for="(response, index) in responses">
          <v-divider
            v-if="index>0"
            :key="response.id"></v-divider>
          <response
            :key="response.id"
            :response="response"/>
        </template>
        <v-divider/>
      </v-list>
      <v-flex pa-3>
        <v-text-field
          name="response-input"
          label="Add a response"
          textarea
        />
        <v-btn>
          Submit
          <v-icon pl-10>send</v-icon>
        </v-btn>
      </v-flex>
      <v-alert
        v-if="error"
        v-html="error"
        outline
        color="error"
        icon="warning"
        :value="true"/>
    </v-card>
  </v-flex>
</template>

<script>
import ResponseService from '@/services/ResponseService'
import Response from '@/components/Response.vue'

export default {
  props: [
    'post'
  ],
  components: {
    Response
  },
  data () {
    return {
      responses: [],
      avatar: null,
      body: null,
      file: null,
      error: null
    }
  },
  async mounted () {
    try {
      this.avatar = `http://localhost:8082/${this.$store.state.user.avatarUri}`
      this.responses = (await ResponseService.index(this.post.id)).data
    } catch (err) {
      this.error = err.response.data.error
    }
  }
}
</script>

<style scoped>

</style>
