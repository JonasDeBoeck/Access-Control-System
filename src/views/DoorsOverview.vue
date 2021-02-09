<template>
  <div class="doors">
    <h1>Doors</h1>
    <Doors/>
  </div>
</template>

<script>
import Doors from '@/components/Doors'
import login from '../variables.js'


export default {
  name: 'DoorsOverview',
  components: {
    Doors
  },
  created(){

    let callback = function(session){
      console.log(session)
    }


    instance.post("http://localhost:8080/api/login", JSON.stringify(data), config).catch(error => console.log(error.response)).then(result => console.log(result.headers))
    login("admin","t", callback)
  }
}
</script>
