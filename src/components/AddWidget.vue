<template>
    <form id="add_widget" class="border border3 p-5" style="max-width=30vw">
        <h2>Voeg Widget toe</h2>
        <div v-if="form_errors_strings.length !==null">
            <p class="error" v-for="error in form_errors_strings" v-bind:key="error.error">{{error.error}}</p>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="inputGroup-sizing-default">Naam</span>
            <input type="text" class="form-control" aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default" v-model="widgetname">
        </div>
        <div class="deurenselect">
            <div class="input-group mb-3 deuren">
                <div class="input-group-prepend">
                    <span id="selected_deur" class="input-group-text" for="inputGroupSelect01">Deur</span>
                </div>
                <div id="multi-select">
                    <div class="input">
                        <input @input="filterInput" type="text" class="select-input form-control"><button type="button" class="btn btn-primary dropdown" id="arrow" @click="showDropDown"><i id="arrow-icon" class="fas fa-chevron-down"></i></button>
                    </div> 
                    <div id="options">
                        <option @click="addRemoveSelected" v-for="door in filteredDoors" :key="door.id" class="option" :id="door.id" :value="door.name">{{door.name}}</option>
                    </div>
                </div>
                <div class="form-check checkbox">
                    <input @change="selectall" class="form-check-input" type="checkbox" value="" id="all">
                    <label class="form-check-label" for="all">All</label>
                </div>
            </div>
            <p>Geselecteerde deuren:</p>
            <div class="doors">
                <p id="list"></p>
            </div>
        </div>

        <div class="time_form">
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Hours</span>
                <input type="number" min=0 max=12 class="form-control" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default" v-model="hours">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Minutes</span>
                <input type="number" min=0 max=60 class="form-control" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default" v-model="minutes">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Seconds</span>
                <input type="number" min=0 max=60 class="form-control" aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default" v-model="seconds">
            </div>
        </div>

        <div class="input-group mb-3 colorpicker">
            <span class="input-group-text" id="inputGroup-sizing-default">
                <colour-picker v-model="color" :value="color" :color="'#4e73df'" label="Pick Colour" picker="compact"
                    v-on:accept="changeColour" />
            </span>
            <input type="text" class="form-control" aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default" v-model="color">
        </div>

        <div class="icons">
            <button type="button" class="icon" @click="setIcon" value="open-door"><img
                    src="@/assets/icons/open-door.png" alt=""></button>
            <button type="button" class="icon" @click="setIcon" value="elevator"><img src="@/assets/icons/elevator.png"
                    alt=""></button>
            <button type="button" class="icon" @click="setIcon" value="parking"><img src="@/assets/icons/parking.png"
                    alt=""></button>
        </div>

        <button @click="addWidget" class="btn btn-primary" type="button">Voeg toe</button>
    </form>
</template>
<script>
    import ColourPicker from 'vue-colour-picker'
    import * as api from '../variables'
    import * as db from '../database'
    export default {
        name: "AddWidget",
        components: {
            'colour-picker': ColourPicker
        },
        data() {
            return {
                doors: [{name: "test door", id:1},{name: "test door 2", id:2},{name: "another test", id:3},
                        {name: "another test 2", id:4}, {name: "idk what to do", id:5},{name: "lsfqsjfsdj", id:6},],
                selectedDoors: [],
                filteredDoors: [],
                hours: 0,
                minutes: 0,
                seconds: 0,
                widgetname: "",
                color: "#0000000",
                icon: "",
                form_errors_strings: [],
                show: false
            }
        },
        methods: {
            async addWidget() {
                // make object
                this.hours = parseInt(this.hours)
                this.minutes = parseInt(this.minutes)
                this.seconds = parseInt(this.seconds)
                this.form_errors_strings = []
                if (this.widgetname === null || this.widgetname === "") {
                    this.form_errors_strings.push({
                        error: "U moet nog een naam ingeven voor de widget!"
                    })
                }
                if (this.selectedDoors === null || this.selectedDoors.length === 0) {
                    this.form_errors_strings.push({
                        error: "U moet nog deuren selecteren!"
                    })
                }
                if (this.color === null || this.color === "") {
                    this.form_errors_strings.push({
                        error: "Geen kleur geselecteerd!"
                    })
                }
                if (this.icon === null || this.icon === "") {
                    this.form_errors_strings.push({
                        error: "Geen icon geselecteerd!"
                    })
                }
                if ((this.hours * 3600 + this.minutes * 60 + this.seconds) === 0) {
                    this.form_errors_strings.push({
                        error: "De duratie mag niet 0 zijn!"
                    })
                }
                if (this.form_errors_strings.length === 0) {
                    let widget = {
                        name: this.widgetname,
                        doors: this.selectedDoors.map(this.changeDoor),
                        color: this.color,
                        icon: this.icon,
                        duration: this.hours * 3600 + this.minutes * 60 + this.seconds
                    }
                    const result = await db.default.insertWidget(widget)
                    console.log(result)
                    this.$emit('add-widget')
                    this.$toasted.show(`${this.widgetname} Succesvol toegevoegd!`, {
                        theme: "toasted-primary",
                        position: "top-right",
                        duration: 1000,
                        icon: 'cogs',
                        iconPack: 'fontawesome',
                        type: 'success'
                    })
                }
                this.$forceUpdate();
            },
            changeDoor(door) {
                return { id: door.id, name: door.name }
            },
            changeColour(colour) {
                let hex = colour.hex;
                this.color = hex;
            },
            setIcon(e) {
                let value = e.target.parentNode.value
                console.log(value)
                this.icon = value;
                let icons = document.getElementsByClassName("icon")
                icons.forEach(element => element.classList.remove("active-icon"))
                icons.forEach(element => {if (element.value === value){element.classList.add("active-icon")}})
            },
            selectall(e) {
                if (e.target.checked) {
                    console.log(this.doors)
                    this.selectedDoors = []
                    this.selectedDoors.push.apply(this.selectedDoors,this.doors) 
                }
                else {
                    this.selectedDoors = [] 
                }
                this.addClassToOptions()
                this.updateList()
            },
            showDropDown(e){
                let arrow = document.getElementById('arrow-icon')
                this.show = !this.show; 
                if (this.show){
                    document.getElementById("options").style.display = "block"
                    e.target.style.borderBottomRightRadius = "0rem";
                    arrow.classList.remove("down")
                    arrow.classList.add("up")
                    this.addClassToOptions()
                }
                else{
                    document.getElementById("options").style.display = "None"
                    e.target.style.borderBottomRightRadius = "0.25rem";
                    arrow.classList.remove("up")
                    arrow.classList.add("down")
                }  
            },
            addClassToOptions(){
                let options = document.getElementsByClassName("option")
                let doorslist = this.selectedDoors.map(door => door.name)
                console.log(doorslist)
                console.log(options.length)
                for (let option of options){
                    if (doorslist.includes(option.value)){
                        console.log("adding class")
                        option.classList.add("option-active")
                    }
                    else{
                        option.classList.remove("option-active")
                    }
                }
            },
            filterInput(e){
                this.show = true;
                let searchString = e.target.value
                this.filteredDoors = []
                for (let d of this.doors){
                    if (d.name.toUpperCase().indexOf(searchString.toUpperCase()) > -1){
                        this.filteredDoors.push(d)
                    }
                }
                if (this.filteredDoors.length === 0){
                    this.filteredDoors.push({name:"Geen gevonden",id:0})
                }
                if (searchString === ''){
                    this.filteredDoors.concat(this.doors)
                }
                this.addClassToOptions()
            },
            addRemoveSelected(e){
                let id = e.target.id
                let i = 0
                for (let door of this.selectedDoors){
                    if (door.id == id){
                        this.selectedDoors.splice(i,1)
                        this.filteredDoors.concat(this.doors)
                        e.target.classList.remove("option-active")
                        this.updateList()
                        return;
                    }
                    i++
                }
                let door = this.doors.filter(door => door.id == id)[0]
                if (door != undefined){
                    this.selectedDoors.push(door)
                    e.target.classList.add("option-active")
                }
                this.updateList()
            },
            updateList(){
                let element = document.getElementById("list")
                let doors = this.selectedDoors.map(door => door.name)
                console.log(doors)
                element.innerText = doors.join(', ')
            }
        },
        async created() {
            let doors = await api.default.getDoorsForOverview(this.$session.get("bs-session-id"))
            this.doors = doors;
            this.filteredDoors = this.doors
        }
    }
</script>

<style scoped>
    #options{
        display: none;
    }

    .up{
        transform: rotate(180deg);
        transition: transform .3s ease-in-out;
    }

    .down{
        transform: rotate(0deg);
        transition: transform .3s ease-in-out;
    }

    #selected_deur{
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .dropdown{
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .option:last-of-type{
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
    }

    .input{
        display: flex;
    }

    #multi-select{
        display: inline-block;
    }

    .select-input{
        border-radius: 0;
    }

    .option:hover{
        /* background-color: #4e73df !important; */
        background-color: var(--bs-primary);
        color: white;
    }

    .option-active{
        background-color: #6ad665 !important;
    }

    .option-active:hover{
        background-color: #ed4242 !important;
        color: white;
    }

    .option{
        background-color: #eee;
    }
    .option:hover{
        cursor: pointer;
    }

    #arrow{
        display: inline;
    }

    #options{
        height: fit-content;
        max-height: 100px;
        overflow: auto;
    }

    #add_widget {
        background: #fff;
        box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
        height: 100%;
    }

    .border3 {
        border-width: 2px !important;
        border-radius: 10px;
    }

    #multiselect {
        margin-left: -5px;
        margin-top: -2px;
        line-height: 1.5;
    }

    #multiselect>>>.multiselect__single {
        display: none;
    }

    .selecter {
        width: 10vw;
    }

    .colorpicker>>>.color-input {
        display: none;
    }

    .colorpicker>>>.current-color {
        border-radius: 0.5em !important;
    }

    .colorpicker>>>.form-label {
        display: none;
    }

    .colorpicker>>>#inputGroup-sizing-default {
        display: flex;
        justify-content: center;
        align-self: center;
        padding: 0;
        margin: 0;
    }

    .colorpicker>>>#inputGroup-sizing-default>div {
        margin-top: 0.35em;
    }

    label {
        margin-left: 5px;
        margin-right: 5px;
    }

    .icons {
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
        box-sizing: border-box;
    }

    .doors {
        padding: .3em;
        display: flex;
        /* justify-content: center; */
        flex-wrap: wrap;
        margin-top: 10px;
        margin-bottom: 15px;
        background: #eee;
        border-radius: 5px;
    }

    .active-icon{
        border: 2px solid #212529;
    }

    .options {
        display: flex;
        /* justify-content: flex-start; */
    }

    /* .form-check-input:checked{
        background-color: green;
    } */
    .deurenselect {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .form-check.checkbox {
        margin-left: 1em !important;
    }

    #open:checked {
        background: green;
    }

    #close:checked {
        background: red;
    }

    .door {
        margin-right: 5px;
    }

    .error {
        color: red;
    }
</style>