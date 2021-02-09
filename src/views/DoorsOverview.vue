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
import axios from 'axios'
import https from 'https'

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
    let data = {
      "User": {
        "login_id": "admin",
        "password": "t"
      }
    }

    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })

    let config ={
      headers: {
        "Content-Type": "application/json"
      }
    }

    instance.post("http://localhost:8080/api/login", JSON.stringify(data), config).catch(error => console.log(error.response)).then(result => console.log(result.headers))
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