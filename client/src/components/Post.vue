<template>
  <v-flex pa-3>
    <v-card>
      <v-card-title primary-title>
        <v-avatar :size="42">
          <img :src="avatar"/>
        </v-avatar>
        <v-layout column align-start>
          <v-flex
            pl-3
            class="headline"
            v-html="post.title"/>
          <v-layout row align-start>
            <v-flex pl-3 pr-1 class="subheading"
              v-html="username"/>
            <v-flex class="subheading" style="font-weight: bold">
              ({{karma}})
            </v-flex>
          </v-layout>
        </v-layout>
      </v-card-title>
      <v-card-text align="left" class="body-1"
        v-html="post.body"/>
      <v-list three-line>
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
      <v-layout row align-center>
        <v-flex pa-3>
          <v-text-field name="response-input" label="Add a response" textfield
            v-model="body"/>
          <input type="file" name="audio" accept="audio/*"
            @change="loadAudio">
        </v-flex>
        <v-flex>
          <v-btn icon @click="submit">
            <v-icon>send</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-flex pa-3>
        <v-alert outline color="error" icon="warning" :value="true"
        v-if="error"
        v-html="error"/>
      </v-flex>
    </v-card>
  </v-flex>
</template>

<script>
import ResponseService from '@/services/ResponseService'
import Response from '@/components/Response.vue'
import UserService from '@/services/UserService'

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
      username: null,
      avatar: null,
      karma: null,
      response: null,
      body: null,
      error: null
    }
  },
  async mounted () {
    let user = null

    try {
      user = (await UserService.show(this.post.UserId)).data.user
      this.responses = (await ResponseService.index(this.post.id)).data
    } catch (err) {
      this.error = err.response.data.error
    }

    this.username = user.name
    this.avatar = `http://localhost:8082/${user.avatarUri}`
    this.karma = user.karma
  },
  methods: {
    async submit () {
      this.error = null

      const response = this.response
      const data = {
        body: this.body
      }

      const form = new FormData()
      for (let item in data) {
        form.append(item, data[item])
      }

      form.append('response', response)

      try {
        await ResponseService.post(this.post.id, form)
        this.$router.push({
          name: 'browse'
        })
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    loadAudio (e) {
      if (!e.target.files[0]) return
      this.response = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
    }
  }
}
</script>

<style scoped></style>
