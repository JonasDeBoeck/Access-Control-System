<template>
<div id="widgets">
    <form id="add_widget" class="border border3 p-5" style="max-width=30vw">
        <h2>Voeg Widget toe</h2>

        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Widget Naam</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="widgetname">
        </div>

        <div class="input-group mb-3 deuren">
            <div class="input-group-prepend">
                <label id="selected_deur" class="input-group-text" for="inputGroupSelect01">Deur</label>
            </div>
            <div id="multiselect">
                <multiselect v-model="selectedDoor" :options="doors" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="id" :preselect-first="true">
                </multiselect>
            </div>
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
//import vSelect from "vue-select"
import Multiselect from "vue-multiselect"
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
        selectedDoor: [],
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

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style scoped>
    #widgets{
        display: flex;
        flex-direction: column;
    }

    #add_widget{
        max-width: 30vw !important;
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
    #multiselect{
        margin-left: -5px;
        margin-top: -2px;
        line-height: 1.5;
    }


    label {
        margin-left: 5px;
        margin-right: 5px;
    }
</style>