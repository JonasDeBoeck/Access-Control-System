<template>
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
            <multiselect v-model="selectedDoors" :options="doors" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="id">
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

    <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default"><colour-picker
            v-model="colour"
            :value="colour"
            label="Pick Colour"
            picker="sketch"
            v-on:accept="changeColour" /></span>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="colour">
    </div>
    
    <div class="icons">
        <button class="icon" value="deur"><img src="https://img.icons8.com/pastel-glyph/50/000000/door--v3.png"/></button>
        <button class="icon" value="lift"><img src="https://img.icons8.com/metro/50/000000/elevator.png"/></button> 
        <button class="icon" value="bareel"><img src="https://img.icons8.com/ios/50/000000/tollbooth.png"/></button> 
    </div>
    
    <button @click="addWidget" class="btn btn-primary">Voeg toe</button>
</form>
</template>
<script>
//import vSelect from "vue-select"
import Multiselect from "vue-multiselect"
import ColourPicker  from 'vue-color-picker'
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
            name: "testlift",
            id: 2
        },
        {
            name: "testslagboom",
            id: 3
        }
        ],
        selectedDoors: [],
        hours: 0,
        minutes: 0,
        seconds: 0,
        widgetname: "",
        colour: '#000000',
        category: {
            class: undefined,
            unicode: undefined
            }
        }
    },
    methods: {
        addWidget(){
            // make object
            let widget = {
                name: this.widgetname,
                doors: this.selectedDoors,
                colour: this.colour,
                duration: {
                    hours: this.hours,
                    minutes: this.minutes,
                    seconds: this.seconds
                }
            }
            this.$emit("add-widget",widget)
        },
        changeColour(colour){
            let hex = colour.hex;
            console.log(hex)
            this.colour = hex;
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
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
        width: 75px;
        height: 75px;
    }
</style>