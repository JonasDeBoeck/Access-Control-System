<template>
  <div class="door-overview">
    <div class="head">
      <h1>Deuren</h1>
      <div class="filters">
        <div>
          <b-dropdown :text="chosenFilter" variant="primary">
            <b-dropdown-item v-for="group in doorGroups" v-bind:key="group.id" @click="filterGroups(group)">{{group.name}}</b-dropdown-item>
          </b-dropdown>
        </div>
        <form action="">
          <input type="text" placeholder="Zoek op..." v-model="searchterm" @input="search">
          <button type="button">
            <i class="fas fa-search fa-sm"></i>
          </button>
        </form>
      </div>
    </div>
    <div class="loader" v-if="visibleDoors.length === 0"><pacman-loader :color="color"></pacman-loader></div>
    <Doors v-if="visibleDoors.length > 0" v-bind:doors="visibleDoors"/>
    <Pagination v-bind:list="filteredDoors" v-bind:currentPage="currentPage" v-bind:pageSize="pageSize" v-on:page:update="updatePage" class="pages" v-if="this.searchterm.length > 0"/>
    <Pagination v-bind:list="doors" v-bind:currentPage="currentPage" v-bind:pageSize="pageSize" v-on:page:update="updatePage" class="pages" v-if="this.searchterm.length === 0"/>
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
      // Originele lijst van deuren
      doors: [],
      // Lijst van deuren bij een search
      filteredDoors: [],
      // Huidige pagina
      currentPage: 0,
      // Aantal deuren per pagina
      pageSize: 9,
      // Deuren die effectief zichtbaar zijn
      visibleDoors: [],
      // Zoek term
      searchterm: '',
      // Alle doorgroups
      doorGroups: [],
      // De gekozen filter
      chosenFilter: 'Kies een deurgroep',
      color: ' rgba(78,115,223,1)'
    }
  },
  methods: {
    updateVisibleDoors(doors) {
      // Slice het deel van de lijst die nodig is en assign dit aan visibleDoors, update ook de currentPage
      this.visibleDoors = doors.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
      if(this.visibleDoors.length == 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage - 1)
      }
    },
    updatePage(pageNumber) {
      // Gebruik de originele of de gefilterde lijst voor de search
      this.currentPage = pageNumber
      if (this.searchterm.length > 0) {
        this.updateVisibleDoors(this.filteredDoors)
      } else {
        this.updateVisibleDoors(this.doors);
      }
    },
    search() {
      // Filter lijst
      this.filteredDoors = this.doors.filter(this.containsString)
      this.updateVisibleDoors(this.filteredDoors)
    },
    containsString(value) {
      return value.name.match(this.searchterm)
    },
    async pollStatusses(){
      // Poll deurstatussen
      let doors = await f.default.getDoorsForOverview(this.$session.get("bs-session-id"))
      this.doors = doors;
      // Update de status van de deuren
      this.visibleDoors.forEach(door => {
        this.doors.forEach(d => {
          if (door.id === d.id) {
            door.unlocked = d.unlocked
          }
        })
      })
      setTimeout(this.pollStatusses,3000)
    },
    filterGroups(group) {
      // Filter de deuren op basis van de deurgroep
      this.chosenFilter = group.name
      if (group.doors === undefined) {
        this.visibleDoors = []
      } else {
        let filtered = []
        this.doors.forEach(door => {
          group.doors.forEach(d => {
            if(door.id == d.id) {
              filtered.push(door)
            }
          })
      })
      this.visibleDoors = filtered
      console.log(this.visibleDoors)
      }
    }
  },
  async created() {
    const result = await f.default.getDoorsForOverview(this.$session.get("bs-session-id"))
    this.doors = result;
    this.filteredDoors = this.doors
    this.doorGroups = await f.default.getDoorGroups(this.$session.get("bs-session-id"))
    this.updateVisibleDoors(this.doors)
    this.pollStatusses()
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

.filters {
  display: flex;
  align-items: center;
}

.filters div:nth-of-type(1) {
  margin-right: 1em;
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
}
</style>