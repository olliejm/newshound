<template>
  <v-list-tile>
    <v-list-tile-content>
      {{response.body}}
      {{file}}
    </v-list-tile-content>
    <v-list-tile-avatar>
      <img :src="avatar"/>
    </v-list-tile-avatar>
  </v-list-tile>
</template>

<script>
import FileService from '@/services/FileService'

export default {
  props: [
    'response'
  ],
  data () {
    return {
      avatar: null,
      file: null,
      error: null
    }
  },
  async mounted () {
    try {
      this.avatar = `http://localhost:8082/${(await FileService.avatarUri(this.response.UserId)).data}`
      this.file = `http://localhost:8082/${(await FileService.responseUri(this.response.id)).data}`
    } catch (err) {
      this.error = err.response.data.error
    }
  }
}
</script>

<style scoped>

</style>
