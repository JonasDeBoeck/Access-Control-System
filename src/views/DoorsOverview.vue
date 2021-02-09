<template>
  <div class="doors">
    <h1>Doors</h1>
    <Doors/>
  </div>
</template>

<script>
import Doors from '@/components/Doors'
import axios from 'axios'
import https from 'https'
//import jquery from 'jquery'

export default {
  name: 'DoorsOverview',
  components: {
    Doors
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
    // fetch("http://localhost:8080/api/login", {
    //   mode: 'no-cors',
    //   method: "POST",
    //   body: JSON.stringify(data)
    // }).then(response => console.log(response.headers))
    //   .catch(err => console.log(err.response))
  }
}
</script>
