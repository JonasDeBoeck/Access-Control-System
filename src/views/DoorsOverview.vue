<template>
  <div class="doors">
    <h1>Doors</h1>
    <Doors/>
  </div>
</template>

<script>
import Doors from '@/components/Doors'
import https from 'https'

export default {
  name: 'DoorsOverview',
  components: {
    Doors
  },
  created(){
    let data = {
      "User": {
        "login_id": "admin",
        "password": "dIET34#ucll"
      }
  }
    //jquery.post("http://localhost:8080/api/login",JSON.stringify(data))
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
    })
    fetch("https://localhost:443/api/login", {
      headers: "Access-Control-Allow-Origin",
      method: "POST",
      body: JSON.stringify(data),
      agent: httpsAgent
    }).then(response => console.log(response.headers))
      .catch(err => console.log(err.response))
  }
}
</script>
