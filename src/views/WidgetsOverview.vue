<template>
  <div class="widgets">
    <h1>Widgets</h1>
    <form>
      <h2>Add Widget</h2>

      <input type="text" placeholder="Widget naam">


      <v-select v-bind:options="doors"
                v-model="selectedDoor" 
                label="name">
      </v-select>
    </form>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import * as f from '../variables'
export default {
  name: 'WidgetsOverview',
  components:{
    vSelect
  },
  created() {
    f.default.login("admin","t",f.default.getDoors)
  },
  data(){
    return {
      doors: [
        {
            name: "testdeur",
            id: 1
        },
        {
            name: "testlift",
            id: 2
        },
        {
            name: "testslagboom",
            id: 3
        }
        ],
      selectedDoor: undefined
      }
    }
}
</script>
