<template>
  <div class="door-overview">
    <h1>Doors</h1>
    <form action="">
      <input type="text">
      <input type="submit">
    </form>
    <Doors v-bind:doors="doors"/>
  </div>
</template>

<script>
import Doors from '@/components/Doors'
import login from '../variables'


export default {
  name: 'DoorsOverview',
  components: {
    Doors
  },
  data() {
    return {
      doors: [
        {name: 'K2.09', opened: false},
        {name: 'K2.10', opened: true},
        {name: 'K2.11', opened: false},
        {name: 'K2.12', opened: false},
        {name: 'K2.13', opened: false},
        {name: 'K2.14', opened: false},
        {name: 'K2.15', opened: false},
        {name: 'K2.16', opened: true},
        {name: 'K2.17', opened: true},
      ],
      session_id: ''
    }
  },
  created(){
    let callback = function(session){
      console.log(session)
    }
    login.login("admin","t", callback)
  }
}
</script>

<style scoped>
.door-overview {
  height: 100%;
}

form {
  float: right;
  margin-right: 2em;
}
</style>