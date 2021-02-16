<template>
  <div id="widgets">
    <div class="head">
      <h1>Widgets</h1>
      <form action="">
        <input type="text" placeholder="Zoek op..." v-model="searchTerm" @input="search">
        <button type="button">
          <i class="fas fa-search fa-sm">
          </i>
        </button>
      </form>
    </div>
    <div class="content">
      <div v-if="this.widgets.length > 0" class="widgets">
          <Widget class="widget" v-for="widget in filteredWidgets" v-bind:key="widget.name" v-bind:widget="widget" v-on:del-widget="updateWidgets"/>
      </div>
      <p class="error" v-if="this.widgets.length === 0">No widgets available</p>
      <AddWidget class="form" v-on:add-widget="updateWidgets"/>
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
  .content{
    display: flex;
    justify-content: space-between;
  }

  .widgets{
    font-family: 'Oswald';
    background: #F8F9FC;
    display: grid;
    grid-template-rows: 2fr 2fr 2fr;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 5%;
    column-gap: 50%;
    /* margin-left: 2.5em; */
    margin-right: 2.5em;
    margin-top: 2.5em;
    margin-left: 5em;
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

.error{
  font-family: 'Oswald';
  font-size: xx-large;
  margin-top: 2em;
  /*make flex item take up remaining space*/
  flex-grow: 1; 
}

  @media only screen and (max-width: 1100px) {
    .content{
      flex-direction: column;
    }
    .widgets{
      /* eerlijk geen idee waarom dit moet want ik flex ipv grid nu, maar anders werkt dat op firefox niet */
      row-gap: 0%;
      display: flex;
      flex-direction: column;
      margin-left: 2.5em
    }
    .form{
      align-self: center !important;
    }
    .widget{
      margin: 0.5em;
    }
  }
</style>

