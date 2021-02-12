<template>
  <div id="widgets">
    <div class="head">
      <h1>Widgets</h1>
      <form action="">
        <input type="text" placeholder="Zoek op..." v-model="searchterm" @input="search">
        <button type="submit">
          <i class="fas fa-search fa-sm">
          </i>
        </button>
      </form>
    </div>
    <div class="content">
      <div class="widgets">
        <Widget v-for="widget in widgets" v-bind:key="widget.name" v-bind:widget="widget" v-on:del-widget="deleteWidget"/>
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
      searchterm: "",
      widgets: [
        {
          colour: '#03fcdb',
          name: "test Widget",
          icon: "open-door",
          id: 1,
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
          icon: "parking",
          id: 2,
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
          icon: "elevator",
          id: 3,
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
      },
      deleteWidget(id){
        console.log(id)
        for (let widget of this.widgets){
          if (widget.id === id){
            let index = this.widgets.indexOf(widget)
            this.widgets.splice(index,1)
          }
        }
      },
      search(){}
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

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 2.5em;
    padding-right: 2.5em;
    padding-top: 1em;
    padding-bottom: 1em;
    background: #fff;
    box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
  }

  input[type=text] {
    border: 0;
    color: #6E707E;
    background-color: rgba(58, 59, 69, .15);
    padding:.50rem 1rem;
    border-top-left-radius: .35rem;
    border-bottom-left-radius: .35rem;
  }
  input:focus, button:focus {
  outline: none;
}
button:hover {
  background: rgb(26, 72, 207);
}
button {
  margin-left: -1px;
  color: #fff;
  background: rgba(58,96,208,1);
  border-color: rgba(58,96,208,1);
  border: 0px;
  border-top-right-radius: .35rem;
  border-bottom-right-radius: .35rem;
  padding:.50rem 1rem;
}
h1 {
  color: rgba(58,96,208,1);
  margin: 0;
  font-family: 'Oswald';
  text-transform: uppercase;
}
</style>

