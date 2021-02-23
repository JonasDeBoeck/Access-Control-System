<template>
    <div v-if="new_widget" class="details">
        <div class="head">
            <h1>{{new_widget.name}}</h1>
        </div>
        <div class="content">
            <div class="general detail">
                <h5 class="card-header">
                    Algemene informatie
                </h5>
                <form class="form">
                    <div class="form-group">
                        <label class="labels align" for="name">Naam</label>
                        <input type="text" class="form-control" id="name" v-model="new_widget.name"
                            v-bind:placeholder="new_widget.name">
                    </div>
                    <div class="input-group form-group mb-3 colorpicker">
                        <label for="colorpicker" class="labels">Kleur</label>
                        <div class="colorinput">
                            <span class="input-group-text" id="colorpicker">
                                <colour-picker label="Pick Colour" :color="new_widget.color"
                                    picker="compact" :style="cssVars" v-on:input="changeColour" />
                            </span>
                            <input type="text" class="form-control" aria-label="Sizing example input"
                                aria-describedby="colorpicker" v-model="new_widget.color">
                        </div>
                    </div>
                </form>
            </div>
            <div class="time detail">
                <h5 class="card-header">
                    Tijd instellen
                </h5>
                <form class="form">
                    <div class="form-group">
                        <label class="labels" for="hours">Uren</label>
                        <input type="number" min="0" class="form-control" id="hours" v-model="hours" v-bind:placeholder="hours">
                    </div>
                    <div class="form-group">
                        <label class="labels" for="minutes">Minuten</label>
                        <input type="number" min="0" max="59" class="form-control" id="minutes" v-model="minutes"
                            v-bind:placeholder="minutes">
                    </div>
                    <div class="form-group">
                        <label class="labels" for="seconds">Seconden</label>
                        <input type="number" min="0" max="59" class="form-control" id="seconden" v-model="seconds"
                            v-bind:placeholder="minutes">
                    </div>
                </form>
            </div>
            <div class="icons detail">
                <h5 class="card-header">
                    Icoon selecteren
                </h5>
                <form class="form">
                    <div class="iconbuttons">
                        <button type="button" class="icon" @click="setIcon" value="open-door"><img
                                src="@/assets/icons/open-door.png" alt=""></button>
                        <button type="button" class="icon" @click="setIcon" value="elevator"><img
                                src="@/assets/icons/elevator.png" alt=""></button>
                        <button type="button" class="icon" @click="setIcon" value="parking"><img
                                src="@/assets/icons/parking.png" alt=""></button>
                    </div>
                </form>
            </div>
            <div class="doors detail">
                <h5 class="card-header">
                    Deuren selectie
                </h5>
                <form class="form">
                    <div class="input-group mb-3 deuren">
                        <div class="tag">
                            <div class="input-group-prepend">
                                <span id="selected_deur" class="input-group-text" for="inputGroupSelect01">Deuren</span>
                            </div>
                            <div id="multiselect">
                                <div>
                                    <multiselect class="selecter" :select-label="''" :taggable="true" :limit="0"
                                        v-model="new_widget.doors" :options="doors" :multiple="true"
                                        :close-on-select="false" :clear-on-select="false" :preserve-search="true"
                                        placeholder="Pick some" label="name" track-by="id" :preselect-first="false">
                                    </multiselect>
                                </div>
                            </div>
                        </div>

                        <div class="form-check checkbox">
                            <input @change="selectall" class="form-check-input" type="checkbox" value="" id="all">
                            <label class="form-check-label" for="all">All</label>
                        </div>

                        <div class="selection" v-if="new_widget && new_widget.doors.length > 0">
                            <pre class="door" v-for="door in new_widget.doors"
                                v-bind:key="door.id">{{ door.name  }}</pre>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <button @click="save" type="button" class="btn btn-primary">Opslaan</button>
    </div>

</template>

<script>
    import * as db from '../database'
    import * as api from '../variables'
    import ColourPicker from 'vue-colour-picker'
    export default {
        data() {
            return {
                widget: undefined,
                new_widget: undefined,
                doors: [],
                init: false,
                hours: 0,
                minutes: 0,
                seconds: 0,
                buttons: []
            }
        },
        components: {
            'colour-picker': ColourPicker
        },
        async created() {
            await this.fetchWidget()
            const doors = await api.default.getDoorsForOverview(this.$session.get('bs-session-id'))
            this.doors = doors;
            let duration = this.widget.duration
            this.hours = Math.floor(duration / 3600)
            duration -= (this.hours * 3600)
            this.minutes = Math.floor(duration / 60)
            duration -= this.minutes * 60
            this.seconds = duration
            this.buttons = document.getElementsByClassName('icon')
            this.$forceUpdate()
        },
        methods: {
            search() { },
            changeColour(color) {
                if (this.init){
                    console.log("changing color")
                    console.log(color)
                    this.new_widget.color = color;
                }
            },
            selectall(e) {
                if (e.target.checked) {
                    this.widget.doors = this.doors
                }
                else {
                    this.widget.doors = []
                }
            },
            setIcon(e) {
                this.new_widget.icon = e.target.parentNode.value
                this.buttons.forEach(element => {
                    element.classList.remove('active')
                });
                this.buttons.forEach(element => {
                    if (element.value === this.new_widget.icon){element.classList.add('active')}  
                });
            },
            async save() {
                this.hours = parseInt(this.hours)
                this.minutes = parseInt(this.minutes)
                this.seconds = parseInt(this.seconds)
                this.new_widget.duration = (this.hours * 3600) + (this.minutes * 60) + this.seconds
                const result = await db.default.updateWidget(this.new_widget)
                this.$router.push({ path: '/widgets' })

                this.$toasted.show(`${this.new_widget.name} Succesvol aangepast!`, {
                    theme: "toasted-primary",
                    position: "top-right",
                    duration: 2000,
                    icon: 'cogs',
                    iconPack: 'fontawesome',
                    type: 'success'
                })
            },
            async fetchWidget(){
                const result = await db.default.getWidget(this.$route.params.id)
                this.widget = result;
                this.new_widget = result;
                this.init = true
            }
        },
        computed: {
            cssVars() {
                return {
                    '--background': this.new_widget.color
                }
            }
        },
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
    .vc-target {
        background: #123456 !important;
    }
</style>

<style scoped>
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

    h5 {
        color: rgba(58, 96, 208, 1)
    }

    h1 {
        color: rgba(58, 96, 208, 1);
        margin: 0;
        font-family: 'Oswald';
        text-transform: uppercase;
    }

    .detail {
        margin: 2em;
        background: #fff;
        box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
        border-radius: .35rem;
    }

    .form {
        padding: 1em;
    }

    .content {
        display: grid;
        grid-template-columns: 2fr 2fr 2fr;
        grid-template-rows: 1fr 1fr;
        font-family: 'Oswald';
    }

    .labels {
        float: left;
    }

    .align {
        align-self: flex-start;
    }

    input,
    textarea,
    select,
    option {
        font-family: Arial, Helvetica, sans-serif;
    }

    .colorpicker {
        display: flex;
        flex-direction: column;
    }

    .colorinput {
        display: flex;
    }

    .colorpicker>>>.color-input {
        display: none;
    }

    .colorpicker>>>.current-color {
        border-radius: 0.5em !important;
        background: var(--background) !important;
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

    .tag {
        display: flex;
    }

    .deuren {
        display: flex;
        flex-direction: column;
    }

    #multiselect>>>.multiselect__single {
        display: none;
    }

    #multiselect {
        width: 100%;
    }

    .checkbox {
        align-self: flex-start;
    }

    .selection {
        padding: .3em;
        display: flex;
        /* justify-content: center; */
        flex-wrap: wrap;
        margin-top: 10px;
        margin-bottom: 15px;
        background: #eee;
        border-radius: 5px;
    }

    .door {
        margin-right: 5px;
    }

    .colorpicker>>>#inputGroup-sizing-default>div {
        margin-top: 0.35em;
    }

    .icon {
        padding: 1em;
        border-radius: 0.5em;
        border: none;
        outline: none;
    }

    .active {
        border: 2px solid #212529;
        border-radius: 0.5em;
        /* border: 2px solid #4e73df; */
    }

    .icons {
        display: flex;
        flex-direction: column;
    }

    .icons>.form {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .iconbuttons {
        width: 75%;
        display: flex;
        justify-content: space-around;
        margin-bottom: 2em;
    }

    .details {
        background-color: #F8F9FC;
    }

    @media only screen and (max-width: 992px) {
        .content {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
        }
    }
</style>