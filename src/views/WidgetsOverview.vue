<template>
  <div id="widgets">
    <div class="head">
      <h1>Widgets</h1>
      <div class="headerOptions">
        <button type="button" class="btn btn-success">Voeg een widget toe</button>
        <form action="">
          <input type="text" placeholder="Zoek op..." v-model="searchTerm" @input="search">
          <button type="button" class="searchButton">
            <i class="fas fa-search fa-sm">
            </i>
          </button>
        </form>
      </div>
    </div>
    <div class="content">
      <div v-if="this.widgets.length > 0" class="widgets">  
          <Widget class="widget" v-for="widget in filteredWidgets" v-bind:key="widget.name" v-bind:widget="widget" v-on:del-widget="updateWidgets"/>
      </div>
      <p class="error" v-if="this.widgets.length === 0">No widgets available</p>
      <div class="form">
        <AddWidget v-on:add-widget="updateWidgets"/>
      </div>
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
    // let response = await db.default.getAllWidgets()
    // console.log(response)
    // this.widgets = response
    // this.filteredWidgets = this.widgets
    // console.log(this.widgets)
    this.pollWidgets()
  },
  data(){
    return {
      doors: [],
      selectedDoor: undefined,
      searchTerm: '',
      filteredWidgets: [],
      widgets: []
      }
    },
    methods:{
      async updateWidgets(){  
        let response = await db.default.getAllWidgets()
        this.widgets = response
        this.filteredWidgets = this.widgets
      },
      search() {
        this.filteredWidgets = this.widgets.filter(this.containsString)
      },
      containsString(value) {
        return value.name.match(this.searchTerm)
      },
      async pollWidgets(){
        let widgetsOverview = await db.default.getAllWidgetsForOverview()
        this.widgets = widgetsOverview
        this.filteredWidgets = this.widgets
        setTimeout(this.pollWidgets,5000);
      }
    }
}
</script>

<style scoped>
  .headerOptions {
    display: flex;
  }

  .headerOptions button {
    margin-right: 1em;
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
  
  .searchButton:hover {
    background: rgb(26, 72, 207);
  }

  .searchButton {
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

  .content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas: "widgets form";
    margin-top: 2.5em;
    margin-left: 2.5em;
    margin-right: 2.5em;
    grid-column-gap: 2em;
    height: 80%;
  }

  .widgets {
    grid-area: widgets;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    grid-column-gap: 2em;
    grid-row-gap: 1em;
    height: 90%;
  }

  .form {
    grid-area: form;
  }
</style>

