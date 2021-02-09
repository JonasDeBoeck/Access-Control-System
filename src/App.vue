<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/layout/Header'
export default {
  name: "App",
  components: {
    Header
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
