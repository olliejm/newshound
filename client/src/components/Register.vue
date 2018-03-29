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
          <div
            class="alert"
            v-if="error">
            {{error}}
          </div>
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
      error: null
    }
  },
  components: {
    Panel
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
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
