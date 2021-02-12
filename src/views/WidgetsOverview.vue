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
import AddWidget from '../components/AddWidget.vue'
import Widget from '../components/Widget.vue'
import * as db from '../database'
export default {
  name: 'WidgetsOverview',
  components:{
    AddWidget,
    Widget
  },
  async created() {
    let response = await db.default.getAllWidgets()
    this.widgets = response
    console.log(this.widgets)
  },
  data(){
    return {
      doors: [],
      selectedDoor: undefined,
      searchterm: "",
      widgets: []
      }
    },
    methods:{
      async addWidget(widget){
        console.log(widget)
        let response = await db.default.getAllWidgets()
        this.widgets = response
        console.log(this.widgets)
        //this.widgets.push(widget)
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

