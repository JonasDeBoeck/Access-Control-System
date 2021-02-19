<template>
    <div class="door" v-bind:class="{'is-opened': door.unlocked, 'is-locked':!door.unlocked}">
        <div class="alert-open-door" v-if="door.nietdicht">
            <img class="icon" :src="require(`../assets/icons/open-door-oh-no.png`)" alt="icoon">
        </div>
        <div>
            <p class="name">{{door.name}}</p>
        </div>
        <div class="icons">
            <div v-on:click="unlock" v-if="!door.unlocked" class="lock">
                <i class="fas fa-lock-open"></i>
                <small>Open</small>
            </div>
            <div v-on:click="lock" v-if="door.unlocked" class="lock">
                <i class="fas fa-lock"></i>
                <small>Sluit</small>
            </div>
            <div v-on:click="openDurationPicker" class="stopwatch">
                <i class="fas fa-stopwatch"></i>
            </div>
            <div v-on:click="openTimePicker" class="clock">
                <i class="fas fa-clock"></i>
            </div>
            <router-link :to="{name: 'DoorDetails', params: {id: this.door.id}}" tag="div"><i class="fas fa-edit" id="edit"></i></router-link>
        </div>
        <vue-modal-2 class="vue-modal-2" :name = "durationModal" @on-close="closeDurationPicker" 
            noHeader
            wrapperBg="rgba(0, 0, 0, 0.10)"
            :footerOptions="{btn1: 'Annuleer', 
                            btn2: 'Bevestig', 
                            btn1OnClick: () => { closeDurationPicker(); },
                            btn2OnClick: () => { setDuration(); }
                            }">
        <div class="wrapper">
            <div class="time_form">
                <p class="form-group">
                    <label>Uren</label>
                    <input type="number" v-model="hours" min="0" max="4" class="form-control" width="90px">
                </p>
                <p class="form-group">
                    <label>Minuten</label>
                    <input type="number" v-model="minutes" min="0" max="60" class="form-control">
                </p>
                <p class="form-group">
                    <label>Seconden</label>
                    <input type="number" v-model="seconds" min="0" max="60" class="form-control">
                </p>
            </div>
        </div>
        </vue-modal-2>
        <vue-modal-2 class="vue-modal-2" :name = "timeModal" @on-close="closeTimePicker" 
            noHeader
            wrapperBg="rgba(0, 0, 0, 0.10)"
            :footerOptions="{btn1: 'Annuleer', 
                            btn2: 'Bevestig', 
                            btn1OnClick: () => { closeTimePicker(); },
                            btn2OnClick: () => { setTime(); }
                            }">
        <div class="wrapper">
            <label>Selecteer een tijdstip</label>
            <vue-clock-picker v-model="time" active-color="#3a60d0" input-class="form-control"></vue-clock-picker>
        </div>
        </vue-modal-2>
    </div>
</template>


<script>
import * as api from '../variables'
import * as db from '../database'
import VueClockPicker from '@pencilpix/vue2-clock-picker';
import '@pencilpix/vue2-clock-picker/dist/vue2-clock-picker.min.css';
export default {
    name: "Door",
    components: {
        VueClockPicker
    },
    props: ["door"],
    data() {
        return {
            hours: 0,
            minutes: 0,
            seconds: 0,
            unlocked: this.door.unlocked === "true",
            nietdicht: this.door.nietdicht === "true",
            timeModal: this.door.id.toString() + "time",
            durationModal: this.door.id.toString() + "duration",
            time: ''
        }
    },
    created(){
        console.log(this.door)
    },
    methods: {
        async lock() {
            this.door.unlocked = false
            api.default.lockDoor(this.door.id, this.$session.get("bs-session-id"));
            this.$toasted.show(`${this.door.name} succesvol gesloten!`, {
                theme: "toasted-primary",
                position: "top-right",
                duration: 1000,
                icon: 'lock',
                iconPack: 'fontawesome',
                type: 'error'
            })
        },

        async unlock() {
            this.door.unlocked = true
            api.default.unlockDoor(this.door.id, this.$session.get("bs-session-id"));
            this.$toasted.show(`${this.door.name} succesvol geopend!`, {
                theme: "toasted-primary",
                position: "top-right",
                duration: 1000,
                icon: 'lock-open',
                iconPack: 'fontawesome',
                type: 'success'
            })
        },
        // Open close modals
        openDurationPicker() {
            this.$vm2.open(this.durationModal)
        },
        closeDurationPicker() {
            this.resetInputs()
            this.$vm2.close(this.durationModal)
        },
        // Open door for certain time
        setDuration() {
            let seconds = (this.hours * 3600) + (this.minutes * 60) + this.seconds
            console.log(seconds)
            this.$vm2.close(this.durationModal)
            let event = {
                doors: [this.door],
                state: true,
                duration: seconds,
            }
            db.default.insertEvent(event)
        },
        openTimePicker() {
            this.time = '';
            this.$vm2.open(this.timeModal)
        },
        closeTimePicker() {
            this.$vm2.close(this.timeModal)
        },
        setTime() {
            let nowString = new Date().toString()
            let endString = new Date().toString().replace(/\d\d:\d\d:\d\d/i, this.time + ":00")
            let now = Date.parse(nowString)
            let end = Date.parse(endString)
            let duration = (end - now) / 1000
            let event = {
                doors: [this.door],
                state: true,
                duration: duration,
            }
            db.default.insertEvent(event)
            this.$vm2.close(this.timeModal)
        },
        resetInputs() {
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
        }
    }
}
</script>

<style scoped>
.door {
    background-color: #fff;
    width: 80%;
    height: 100%;
    border-radius: .35rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
    position: relative;
}

.icons {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-top: 5%;
    margin-bottom: 5%;
}

i {
    font-size: 2em;
}

.is-opened {
    border-left: 0.25rem solid green;
}

.is-locked {
    border-left: 0.25rem solid red;
}

.time_form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 30%;
}

label {
    margin-left: 5px;
    margin-right: 5px;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-group {
    margin-block-end: 1em;
    margin-block-start: 1em;
}

.lock {
    min-width: 36px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
}

.lock i:hover {
    transform: scale(1.15);
}

.clock i:hover {
    transform: scale(1.15);
}

.stopwatch i:hover {
    transform: scale(1.15);
}

#edit:hover {
    transform: scale(1.15);
}

.clock {
    cursor: pointer;
}

small {
    font-weight: bold;
    font-family: 'Oswald';
}

.name {
    font-family: 'Oswald';
    text-transform: uppercase;
}

.alert-open-door {
    position: absolute;
    right: 10px;
    top: 15px;
}

.alert-open-door img {
    width: 66%;
}

.name {
    margin: 15px;
    font-size: 20px;
}

.vue-modal-2 {
    z-index: 999;
}

.wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 1em;
    margin-bottom: 1em;
}
</style>