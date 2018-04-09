<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Register">
        <form
          name="register-form"
          autocomplete="off">
          <v-text-field
            label="Email Address"
            v-model="email"
          />
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            autocomplete="new-password"
          />
          <v-avatar
            :tile="tile"
            :size="56"
            class="grey lighten-4"
          >
            <img :src="imgURI" alt="avatar">
          </v-avatar>
          <input @change="loadImage" type="file" name="photo" accept="image/*">
          <div
            class="alert"
            v-if="error">
            {{error}}
          </div>
          <br/>
          <v-btn
            dark
            class="light-blue"
            @click="register">
            Register
          </v-btn>
        </form>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel.vue'

export default {
  data () {
    return {
      email: '',
      password: '',
      imgURI: null,
      avatar: null,
      error: null
    }
  },
  components: {
    Panel
  },
  methods: {
    async register () {
      try {
        const data = {
          email: this.email,
          password: this.password,
          avatar: null
        }

        const avatar = this.avatar
        const form = new FormData()

        for (let item in data) {
          form.append(item, data[item])
        }

        form.append('avatar', avatar)
        const response = await AuthenticationService.register(form)

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
