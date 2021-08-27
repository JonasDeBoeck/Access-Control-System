<template>
  <div id="widgets">
    <div class="head">
      <h1>Widgets</h1>
      <div class="headerOptions">
        <form action="">
          <input type="text" placeholder="Zoek op..." v-model="searchterm" @input="search">
          <button type="button" class="searchButton">
            <i class="fas fa-search fa-sm">
            </i>
          </button>
        </form>
      </div>
    </div>
    <div class="content">
      <div class="form">
        <AddWidget v-on:add-widget="updateWidgets" />
      </div>
      <div v-if="this.widgets.length > 0" class="widgets">
        <Widget class="widget" v-for="widget in visibleWidgets" v-bind:key="widget.name" v-bind:widget="widget"
          v-on:del-widget="updateWidgets" />
      </div>
      <p class="error" v-if="this.widgets.length === 0">No widgets available</p>
    </div>
    <Pagination v-bind:list="widgets" v-bind:currentPage="currentPage" v-bind:pageSize="pageSize"
      v-on:page:update="updatePage" v-if="this.searchterm.length === 0" class="pages" />
    <Pagination v-bind:list="filteredWidgets" v-bind:currentPage="currentPage" v-bind:pageSize="pageSize"
      v-on:page:update="updatePage" v-if="this.searchterm.length > 0" class="pages" />
  </div>
</template>

<script>
  import AddWidget from '../components/AddWidget.vue'
  import Widget from '../components/Widget.vue'
  import Pagination from '../components/Pagination.vue'
  import * as db from '../database'
  export default {
    name: 'WidgetsOverview',
    components: {
      AddWidget,
      Widget,
      Pagination
    },
    async created() {
      this.widgets = await db.default.getAllWidgetsForOverview()
      this.widgets = this.widgets.sort((first, second) => first.id - second.id)
      this.filteredWidgets = this.widgets
      this.updateVisibleWidgets(this.widgets)
      this.pollWidgets()
    },
    data() {
      return {
        doors: [],
        selectedDoor: undefined,
        // Zoekterm
        searchterm: '',
        // Gefilterde widgets
        filteredWidgets: [],
        // Originele lijst van widgets
        widgets: [],
        // Zichtbare widgets
        visibleWidgets: [],
        // Huidige pagina 
        currentPage: 0,
        // Aantal deuren per pagina
        pageSize: 6,
      }
    },
    methods: {
      async updateWidgets() {
        let response = await db.default.getAllWidgets()
        this.widgets = response
        this.filteredWidgets = this.widgets
        this.updateVisibleWidgets(response)
      },
      updateVisibleWidgets(widgets) {
        // Slice het deel van de lijst die nodig is en assign dit aan visibleDoors, update ook de currentPage
        this.visibleWidgets = widgets.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
        if (this.visibleWidgets.length == 0 && this.currentPage > 0) {
          this.updatePage(this.currentPage - 1)
        }
      },
      updatePage(pageNumber) {
        // Gebruik de originele of de gefilterde lijst voor de search
        this.currentPage = pageNumber
        if (this.searchterm.length > 0) {
          this.updateVisibleWidgets(this.filteredWidgets)
        } else {
          this.updateVisibleWidgets(this.widgets);
        }
      },
      search() {
        this.filteredWidgets = this.widgets.filter(this.containsString)
        this.updateVisibleWidgets(this.filteredWidgets)
      },
      containsString(value) {
        return value.name.match(this.searchterm)
      },
      async pollWidgets() {
        let widgetsOverview = await db.default.getAllWidgetsForOverview()
        this.widgets = widgetsOverview.sort((first, second) => first.id - second.id)
        setTimeout(this.pollWidgets, 5000);
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
    padding: .50rem 1rem;
    border-top-left-radius: .35rem;
    border-bottom-left-radius: .35rem;
  }

  input:focus,
  button:focus {
    outline: none;
  }

  .searchButton:hover {
    background: rgb(26, 72, 207);
  }

  .searchButton {
    margin-left: -1px;
    color: #fff;
    background: rgba(58, 96, 208, 1);
    border-color: rgba(58, 96, 208, 1);
    border: 0px;
    border-top-right-radius: .35rem;
    border-bottom-right-radius: .35rem;
    padding: .50rem 1rem;
  }

  h1 {
    color: rgba(58, 96, 208, 1);
    margin: 0;
    font-family: 'Oswald';
    text-transform: uppercase;
  }

  .content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas: "widgets form";
    margin-top: 1em;
    margin-left: 1em;
    margin-right: 1em;
    grid-column-gap: 2em;
  }

  #widgets {
    background-color: #F8F9FC;
  }

  .widgets {
    grid-area: widgets;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    grid-column-gap: 2em;
    grid-row-gap: 1em;
  }

  .form {
    grid-area: form;
  }


  @media only screen and (max-width: 992px) {
    .content {
      display: block;
    }

    .widgets {
      margin-top: 2em;
      display: block;
    }

    .widget {
      margin-top: 1em;
    }
  }
</style>