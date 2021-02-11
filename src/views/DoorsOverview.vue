<template>
  <div class="door-overview">
    <div class="head">
      <h1>Doors</h1>
      <form action="">
        <input type="text" placeholder="Zoek op..." v-model="searchterm" @input="search">
        <button type="submit">
          <i class="fas fa-search fa-sm">
          </i>
        </button>
      </form>
    </div>
    <Doors v-bind:doors="visibleDoors"/>
    <Pagination v-bind:doors="filteredDoors" v-bind:currentPage="currentPage" v-bind:pageSize="pageSize" v-on:page:update="updatePage" class="pages" v-if="this.searchterm.length > 0"/>
    <Pagination v-bind:doors="doors" v-bind:currentPage="currentPage" v-bind:pageSize="pageSize" v-on:page:update="updatePage" class="pages" v-if="this.searchterm.length === 0"/>
  
  </div>
</template>

<script>
import Doors from '@/components/Doors'
import Pagination from '@/components/Pagination'
import * as f from '../variables'

export default {
  name: 'DoorsOverview',
  components: {
    Doors,
    Pagination
  },
  data() {
    return {
      doors: [
      
      ],
      sessionId: '',    
      filteredDoors: [],
      currentPage: 0,
      pageSize: 9,
      visibleDoors: [],
      searchterm: ''
    }
  },
  methods: {
    updateVisibleDoors(doors) {
      this.visibleDoors = doors.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
      if(this.visibleDoors.length == 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage - 1)
      }
    },
    updatePage(pageNumber) {
      this.currentPage = pageNumber
      if (this.searchterm.length > 0) {
        this.updateVisibleDoors(this.filteredDoors)
      } else {
        this.updateVisibleDoors(this.doors);
      }
    },
    search() {
      this.filteredDoors = this.doors.filter(this.containsString)
      this.updateVisibleDoors(this.filteredDoors)
    },
    containsString(value) {
      return value.name.match(this.searchterm)
    }
  },
  async created(){
    const key = await f.default.login("admin","dIET34#ucll")
    const result = await f.default.getDoorsForOverview(key)
    this.doors = result;
    this.filteredDoors = this.doors
    this.updateVisibleDoors(this.doors)
    console.log(result)
  }
}
</script>

<style scoped>
.door-overview {
  height: 100%;
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
.pages {
  margin-top: 0.5em;
}
</style>