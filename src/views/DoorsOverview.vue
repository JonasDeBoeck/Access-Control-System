<template>
  <div class="door-overview">
    <div class="head">
      <h1>Doors</h1>
      <form action="">
        <input type="text" placeholder="Zoek op...">
        <button type="submit">
          <i class="fas fa-search fa-sm">
          </i>
        </button>
      </form>
    </div>
    <Doors v-bind:doors="doors"/>
  </div>
</template>

<script>
import Doors from '@/components/Doors'
import login from '../variables'

export default {
  name: 'DoorsOverview',
  components: {
    Doors
  },
  data() {
    return {
      doors: [
        {name: 'K2.09', opened: false},
        {name: 'K2.10', opened: true},
        {name: 'K2.11', opened: false},
        {name: 'K2.12', opened: false},
        {name: 'K2.13', opened: false},
        {name: 'K2.14', opened: false},
        {name: 'K2.15', opened: false},
        {name: 'K2.16', opened: true},
        {name: 'K2.17', opened: true},
      ],
      session_id: ''
    }
  },
  created(){
    let callback = function(session){
      console.log(session)
    }
    login.login("admin","t", callback)
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
}
</style>