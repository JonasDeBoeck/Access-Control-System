<template>
<form id="add_widget" class="border border3 p-5" style="max-width=30vw">
    <h2>Voeg Widget toe</h2>

    <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Widget Naam</span>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="widgetname">
    </div>
    <div class="deurenselect">
        <div class="input-group mb-3 deuren">
            <div class="input-group-prepend">
                <span id="selected_deur" class="input-group-text" for="inputGroupSelect01">Deur</span>
            </div>
            <div id="multiselect">
                <div>
                    <multiselect class="selecter" :select-label="''" :taggable="true" :limit="0" v-model="selectedDoors" :options="doors" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="id" :preselect-first="false">
                    </multiselect>
                    <div class="doors" v-if="this.selectedDoors.length > 0">
                        <pre class="door" v-for="door in selectedDoors" v-bind:key="door.id" >{{ door.name  }}</pre>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-check checkbox">
            <input @change="selectall" class="form-check-input" type="checkbox" value="" id="all">
            <label class="form-check-label" for="all">All</label>
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

    <div class="input-group mb-3 colorpicker">
        <span class="input-group-text" id="inputGroup-sizing-default"><colour-picker
            v-model="colour"
            :value="colour"
            label="Pick Colour"
            picker="compact"
            v-on:accept="changeColour" /></span>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="colour">
    </div>
    
    <div class="icons">
        <button type="button" class="icon" @click="setIcon" value="open-door"><img src="@/assets/icons/open-door.png" alt=""></button>
        <button type="button" class="icon" @click="setIcon" value="elevator"><img src="@/assets/icons/elevator.png" alt=""></button> 
        <button type="button" class="icon" @click="setIcon" value="parking"><img src="@/assets/icons/parking.png" alt=""></button>
    </div>

    <div class="form-check">
        <input  class="form-check-input" type="radio" name="flexRadioDefault" id="open">
        <label class="form-check-label" for="flexRadioDefault1">Open</label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="close" checked>
        <label class="form-check-label" for="flexRadioDefault2">Close</label>
    </div>
    
    <!-- coole button -->
    <!-- <div class="form-check form-switch options">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
        <label class="form-check-label" for="flexSwitchCheckDefault">Open</label>
    </div> -->

    <button @click="addWidget" class="btn btn-primary">Voeg toe</button>
</form>
</template>
<script>
//import vSelect from "vue-select"
import Multiselect from "vue-multiselect"
import ColourPicker  from 'vue-colour-picker'
import * as api from '../variables'
import * as db from '../database'
export default {
    name: "AddWidget",
    components:{
        Multiselect,
        'colour-picker': ColourPicker
    },
    data(){
    return {
      doors: [
        {
            name: "testdeur",
            id: 1
        },
        {
            name: "idk",
            id: 3
        },
        {
            name: "lskdjfs",
            id: 4
        },
        {
          name: "testdeur",
          id: 5
        },
        {
            name: "idk",
            id: 6
        },
        {
            name: "lskdjfs",
            id: 7
        }
        ],
        selectedDoors: [],
        hours: 0,
        minutes: 0,
        seconds: 0,
        widgetname: "",
        colour: '#000000',
        icon: ""
        }
    },
    methods: {
        addWidget(){
            // make object
            let widget = {
                name: this.widgetname,
                doors: this.selectedDoors.map(this.changeDoor),
                color: this.colour,
                icon: this.icon,
                duration: this.hours * 3600 + this.minutes * 60 + this.seconds
            }
            //this.$emit("add-widget",widget)
            db.default.insertWidget(widget)
        },
        changeDoor(door){
            return {name: door.name}
        },
        changeColour(colour){
            let hex = colour.hex;
            this.colour = hex;
        },
        setIcon(e){
            let value = e.target.parentNode.value
            this.icon = value;
        },
        selectall(e){
            if (e.target.checked){
                this.selectedDoors = this.doors
            }
            else{
                this.selectedDoors = []
            }
        }
    },
    async created(){
        let doors = await api.default.getDoorsForOverview(this.$session.get("bs-session-id"))
        this.doors.concat(doors);
        console.log(this.doors)
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
    .vc-target{
        background: #123456  !important;
    }
</style>
<style scoped>
    #add_widget{
        max-width: 30vw !important;
        align-self: flex-end;
        margin: 2em;
        background: #fff;
        box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
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
    #multiselect >>> .multiselect__single{
        display: none;
    }

    .selecter{
        width: 10vw;
    }

    .colorpicker >>> .color-input{
        display: none;
    }
    .colorpicker >>> .current-color{
        border-radius: 0.5em !important;
    }
    .colorpicker >>> .form-label{
        display: none;
    }
    .colorpicker >>> #inputGroup-sizing-default{
        display: flex;
        justify-content: center;
        align-self: center;
        padding: 0;
        margin: 0;
    }

    .colorpicker >>> #inputGroup-sizing-default > div{
        margin-top: 0.35em;
    }
    
    label {
        margin-left: 5px;
        margin-right: 5px;
    }
    .icons{
        display: flex;
        margin: 1em;
        justify-content: space-between;
    }
    .icon:visited {
        background: #7995f1;
    }
    .icon {
        border-radius: 5px;
        padding: 10px;
        width: 84;
        height: 84;
        border: none;
    }

    .doors{
        padding: .3em;
        max-width: 12vw;
        display: flex;
        /* justify-content: center; */
        flex-wrap: wrap;
        margin-top: 10px;
        background:#eee;
        border-radius: 5px;
    }

    .options{
        display: flex;
        /* justify-content: flex-start; */
    }

    /* .form-check-input:checked{
        background-color: green;
    } */

    .deurenselect{
        display: flex;
        justify-content: space-between;
    }
    .checkbox{
        margin-left: 0.5em;
    }

    #open:checked{
        background: green;
    }

    #close:checked{
        background: red;
    }

    .door{
        margin-right: 5px;
    }
</style>