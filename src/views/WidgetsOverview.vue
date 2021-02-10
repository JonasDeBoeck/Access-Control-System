<template>
  <div id="widgets">
    <h1>Widgets</h1>
    <div class="content">
      <div class="widgets">
        <Widget v-for="widget in widgets" v-bind:key="widget.name" v-bind:widget="widget"/>
      </div>
      <AddWidget class="form" v-on:add-widget="addWidget"/>
    </div>
  </div>
</template>

<script>
import * as f from '../variables'
import AddWidget from '../components/AddWidget.vue'
import Widget from '../components/Widget.vue'
export default {
  name: 'WidgetsOverview',
  components:{
    AddWidget,
    Widget
  },
  created() {
    f.default.login("admin","t").then(session => f.default.getDoors(session).then(doors => console.log(doors)))
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
      selectedDoor: undefined,
      widgets: [
        {
          colour: '#03fcdb',
          name: "test Widget",
          doors: [
            {
              name: "K2.09",
              id: 1
            },
            {
              name: "K2.10",
              id: 2
            }],
            duration: {
              hours: 0,
              minutes: 1,
              seconds: 30
            }
        },
        {
          colour: '#db96eb',
          name: "open slagboom 90s",
          doors: [
            {
              name: "slagboom",
              id: 1
            },
            ],
            duration: {
              hours: 0,
              minutes: 1,
              seconds: 30
            }
        },
        {
          colour: '#a7eba2',
          name: "open leeraarskamer 90s",
          doors: [
            {
              name: "k0.1",
              id: 1
            },
            ],
            duration: {
              hours: 0,
              minutes: 1,
              seconds: 30
            }
        }
      ]
      }
    },
    methods:{
      addWidget(widget){
        this.widgets.push(widget)
      }
    }
}
</script>

<style scoped>
  .content{
    display: flex;
    justify-content: space-between;
  }

  .widgets{
    background: #F8F9FC;
    display: grid;
    grid-template-rows: 2fr 2fr 2fr;
    grid-template-columns: 1fr 1fr;
    row-gap: 20%;
    column-gap: 5%;
    margin-left: 2.5em;
    margin-right: 2.5em;
    margin-top: 2.5em;
    height: 80%;
  }
</style>

