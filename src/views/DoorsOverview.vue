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

    login("admin","t", callback)
  }
}
</script>
