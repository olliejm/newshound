<template>
  <v-flex
    pa-3>
    <v-card>
      <v-card-title
        primary-title>
        <v-avatar
          :size="42">
          <img
            :src="avatar">
        </v-avatar>
        <div
          v-html="post.title"
          class="headline"> </div>
      </v-card-title>
      <div
        v-html="post.body"
        class="body-2"></div>
      <v-list three-line>
        <div class="subheading">Responses</div>
        <template v-for="(response, index) in responses">
          <v-divider
            v-if="index>0"
            :key="response.id"></v-divider>
          <response
            :key="response.id"
            :response="response"/>
        </template>
      </v-list>
      <v-flex pa-3>
        <v-text-field
          name="response-input"
          label="Add a response"
          textarea
        ></v-text-field>
        <v-btn>
          Submit
          <v-icon>send</v-icon>
        </v-btn>
      </v-flex>
      <v-alert
        v-if="error"
        outline
        color="error"
        icon="warning"
        :value="true">
        {{error}}
      </v-alert>
    </v-card>
  </v-flex>
</template>

<script>
import FileService from '@/services/FileService'
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
      this.avatar = `http://localhost:8082/${(await FileService.avatarUri(this.post.UserId)).data}`
      this.responses = (await ResponseService.index(this.post.id)).data
    } catch (err) {
      this.error = err.response.data.error
    }
  }
}
</script>

<style scoped>

</style>
