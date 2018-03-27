<template>
  <v-toolbar fixed class="light-blue" dark>
    <v-toolbar-title class="mr-4">
      <span class="home" @click="navigateTo('/')">
        Newshound
      </span>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn
        flat
        dark
        @click="navigateTo('browse')">
        Browse
      </v-btn>
    </v-toolbar-items>
    <v-spacer/>
    <v-toolbar-items>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        dark
        @click="navigateTo('register')">
        Register
      </v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        dark
        @click="navigateTo('login')">
        Login
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        dark
        @click="logout">
        Logout
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: '/'
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: aliceblue;
}
</style>
