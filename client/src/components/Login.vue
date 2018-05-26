<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="headline">
        Login</div>
      <form name="login-form">
        <v-text-field
          label="Email Address"
          v-model="email"/>
        <v-text-field
          label="Password"
          type="password"
          v-model="password"
          autocomplete="new-password"/>
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
          @click="login">
          Login
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
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await UserService.login({
          email: this.email,
          password: this.password
        })

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        this.$router.push({
          name: '/'
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
