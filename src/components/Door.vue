<template>
    <div class="door" v-bind:class="{'is-opened':door.opened, 'is-locked':!door.opened}">
        <div>
            <p class="name">{{door.name}}</p>
        </div>
        <div class="icons">
            <div v-on:click="unlock" v-if="!door.opened" class="lock">
                <i class="fas fa-lock-open"></i>
                <small>Open</small>
            </div>
            <div v-on:click="lock" v-if="door.opened" class="lock">
                <i class="fas fa-lock"></i>
                <small>Sluit</small>
            </div>
            <div v-on:click="open">
                <i class="fas fa-clock"></i>
            </div>
        </div>
        <vue-modal-2 name="time" @on-close="close" 
        noHeader
        wrapperBg="rgba(0, 0, 0, 0.10)"
        :footerOptions="{btn1: 'Annuleer', 
                        btn2: 'Bevestig', 
                        btn1OnClick: () => { close(); },
                        btn2OnClick: () => { setTime(); }
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
    </div>
</template>

<script>
export default {
    name: "Door",
    props: ["door"],
    data() {
        return {
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    },
    methods: {
        lock() {
            this.door.opened = false
        },

        unlock() {
            this.door.opened = true
        },
        open() {
            this.$vm2.open('time')
        },
        close() {
            this.resetInputs()
            this.$vm2.close('time')
        },
        setTime() {
            let seconds = (this.hours * 3600) + (this.minutes * 60) + this.seconds
            console.log(seconds)
            this.$vm2.close('time')
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
    width: 100%;
    height: 100%;
    border-radius: .35rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
}

.icons {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
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
}

small {
    font-weight: bold;
    font-family: 'Oswald';
}

.name {
    font-family: 'Oswald';
    text-transform: uppercase;
}
</style>