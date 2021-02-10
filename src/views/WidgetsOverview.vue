<template>
  <div id="widgets">
    <h1>Widgets</h1>
    <AddWidget/>
  </div>
</template>

<script>
import * as f from '../variables'
import AddWidget from '../components/AddWidget.vue'
export default {
  name: 'WidgetsOverview',
  components:{
    AddWidget
  },
  created() {
    f.default.login("admin","dIET34#ucll",f.default.getDoors)
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

