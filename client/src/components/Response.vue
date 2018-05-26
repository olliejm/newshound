<template>
  <v-list-tile>
    <v-list-tile-content>
      {{response.body}}
      <a
        :href="file">
        Download File
      </a>
    </v-list-tile-content>
    <v-list-tile-avatar>
      <img :src="avatar"/>
    </v-list-tile-avatar>
  </v-list-tile>
</template>

<script>
import UserService from '@/services/UserService'

export default {
  props: [
    'response'
  ],
  data () {
    return {
      user: null,
      avatar: null,
      file: null,
      error: null
    }
  },
  async mounted () {
    try {
      this.user = await UserService.show(this.response.UserId)
      this.avatar = `http://localhost:8082/${this.user.avatarUri}`
      this.file = `http://localhost:8082/${this.response.audioUri}`
    } catch (err) {
      this.error = err.response.data.error
    }
  }
}
</script>

<style scoped>
</style>
