<template>
  <div id="app">
    <Header v-bind:loggedIn="loggedIn" v-on:logOut="logOut"/>
    <router-view v-on:logIn="logIn"/>
  </div>
</template>

<script>
import Header from '@/components/layout/Header'
export default {
  name: "App",
  components: {
    Header
  } ,
  data() {
    return {
      // Houdt bij of een user is geauthenticeerd of niet
      loggedIn: this.$session.has('bs-session-id')
    }
  }, 
  methods: {
    // Verander waarden loggedIn
    logIn() {
      this.loggedIn = true
    },
    logOut() {
      this.loggedIn = false
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 7fr;
  grid-template-areas: "header content";
  background-color: #F8F9FC;
}

body {
  margin: 0px;
  height: 100%;
}

html {
  height: 100%;
}

header {
  grid-area: header;
}
</style>
