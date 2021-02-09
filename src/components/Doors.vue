<template>
  <div class="doors" >
    <div v-for="door in doors" v-bind:key="door.name">
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
    margin-left: 2.5em;
    margin-right: 2.5em;
    margin-top: 2.5em;
    height: 80%;
  }
</style>
