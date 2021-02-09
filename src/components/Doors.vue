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
    column-gap: 15%;
    margin-top: 5em;
    margin-left: 2em;
    margin-right: 2em;
    height: 80%;
  }
</style>
