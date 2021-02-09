<template>
<div id="widgets">
<form id="form" class="border border3 p-5">
        <h2>Voeg Widget toe</h2>

        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Widget Naam</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="widgetname">
        </div>

        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Deur</label>
            </div>
            <!-- <v-select v-bind:options="doors" class="custom-select"
                v-model="selectedDoor" 
                label="name">
            </v-select> -->
            <multiselect v-model="selectedDoor" :options="doors" placeholder="selecteer een deur" label="name" track-by="name">

            </multiselect>
        </div>

        

        <div class="time_form">
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Hours</span>
                <input type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="hours">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Minutes</span>
                <input type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="minutes">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Seconds</span>
                <input type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="seconds">
            </div>
        </div>

        <button class="btn btn-primary" type="submit">Voeg toe</button>

    </form>
</div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
    name: "AddWidget",
    components:{
        Multiselect
    },
    data(){
    return {
      doors: [
        {
            name: "testdeur",
            id: 1
        },
        {
            name: "testlift",
            id: 2
        },
        {
            name: "testslagboom",
            id: 3
        }
        ],
        selectedDoor: undefined,
        hours: 0,
        minutes: 0,
        seconds: 0,
        widgetname: ""
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>
    #widgets{
        display: flex;
        flex-direction: column;
    }

    #form{
        align-self: flex-end;
        margin: 2em;
        background: #eee;
    }

    .border3 {
        border-width:2px !important;
        border-radius: 10px;
    }

    .input-group>span {
        max-width: 10vw;
        min-width: 5vw;
    }
    .input-group>input{
        max-width: 10vw;
    }

    label {
        margin-left: 5px;
        margin-right: 5px;
    }
</style>