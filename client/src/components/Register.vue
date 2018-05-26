<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="headline">
        Register
      </div>
      <form
        name="register-form"
        autocomplete="off">
        <v-text-field
          v-model="name"
          label="Full Name"/>
        <v-text-field
          v-model="email"
          label="Email Address"/>
        <v-text-field
          v-model="password"
          type="password"
          label="Password"
          autocomplete="new-password"/>
        <v-flex>
          <v-avatar
            :tile="tile"
            class="grey lighten-4">
            <img
              :src="imgURI"
              alt="avatar">
          </v-avatar>
          <input
            @change="loadImage"
            type="file"
            name="photo"
            accept="image/*">
        </v-flex>
        <v-alert
          v-if="error"
          v-html="error"
          :value="true"
          color="error"
          icon="warning"/>
        <br/>
        <v-btn
          @click="register"
          class="light-blue"
          dark>
          Register
        </v-btn>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import UserService from '@/services/UserService'

export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      imgURI: null,
      avatar: null,
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const data = {
          name: this.name,
          email: this.email,
          password: this.password
        }

        const avatar = this.avatar
        const form = new FormData()

        for (let item in data) {
          form.append(item, data[item])
        }

        form.append('avatar', avatar)

        const response = await UserService.register(form)

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        this.$router.push({
          name: '/browse'
        })
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    loadImage (e) {
      if (!e.target.files[0]) return

      this.avatar = e.target.files[0]

      const reader = new FileReader()
      reader.onload = (e) => {
        this.imgURI = e.target.result
      }

      reader.readAsDataURL(e.target.files[0])
    }
  }
}
</script>

<style scoped>
</style>
