<template>
  <div class="doors" >
    <div v-for="door in doors" v-bind:key="door.id">
      <Door v-bind:door="door"/>
    </div>
  </div>
</template>

<script>
import Door from '@/components/Door'

export default {
  name: 'Doors',
  components: {
    Door
  },
  props:["doors"]
}
</script>

<style scoped>
  .doors {
    display: grid;
    grid-template-rows: 2fr 2fr 2fr;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 20%;
    column-gap: 5%;
    margin-left: 1em;
    margin-right: 1em;
    margin-top: 1em;
    height: 80%;
  }

  
@media only screen and (max-width: 992px) {
  .doors {
    display: block;
  }
}
</style>
