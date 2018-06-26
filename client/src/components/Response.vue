<template>
  <v-list-tile>
    <v-list-tile-avatar>
      <img :src="avatar"/>
    </v-list-tile-avatar>
    <v-list-tile-content>
      {{response.body}}
      <a :href="file">
        Download File
      </a>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn icon @click="upVote">
        <v-icon color="pink">thumb_up</v-icon>  ({{response.upVotes}})
      </v-btn>
    </v-list-tile-action>
    <v-list-tile-action>
      <v-btn icon @click="downVote">
        <v-icon color="pink">thumb_down</v-icon>  ({{response.downVotes}})
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import UserService from '@/services/UserService'
import VoteService from '@/services/VoteService'

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
    let user = null

    try {
      user = (await UserService.show(this.response.UserId)).data.user
      this.file = `http://localhost:8082/${this.response.audioUri}`
    } catch (err) {
      this.error = err.response.data.error
    }

    this.avatar = `http://localhost:8082/${user.avatarUri}`
  },
  methods: {
    async upVote () {
      try {
        await VoteService.update(this.response.id, {
          upVote: true
        })
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    async downVote () {
      try {
        await VoteService.update(this.response.id, {
          upVote: false
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
