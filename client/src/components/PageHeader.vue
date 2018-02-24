<template>
  <v-toolbar fixed class="light-blue" dark>
    <v-toolbar-title class="mr-4">
      <span class="home" @click="navigateTo('root')">
        Newshound
      </span>
    </v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items>
      <v-btn flat dark @click="navigateTo('register')">
        Register
      </v-btn>
      <v-btn flat dark @click="navigateTo('login')">
        Login
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
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
