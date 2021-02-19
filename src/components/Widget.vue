<template>
    <div class="widget" :style="cssVars">
        <div @click="executeWidget" class="iconcontainer">
            <img class="icon" :src="require(`../assets/icons/${this.widget.icon}.png`)" alt="icoon">    
        </div>
        <div  class="content ">
            <h2>{{widget.name}}</h2>
            <div class="doors">
                <p class="door" v-for="door in widget.doors" v-bind:key="door.id">{{door.name}}</p>
            </div>
            <div v-if="widget.active" class="active">
                <i class="fas fa-bolt"></i>
            </div>
        </div>
        <div class="icons">
            <div class="time">
                <div class="clock">
                    <i class="far fa-clock"></i>
                </div>
                <p>{{this.hours}}:{{this.minutes}}:{{this.seconds}}</p>
            </div>
            
            <div class="buttons"> 
                <div  class="button" id="kleur"><router-link :to="{ name: 'WidgetDetails', params: {id: widget.id}}" > <i class="fas fa-edit "></i> </router-link></div>
                <div @click="remove" class="button"><i class="fas fa-trash-alt"></i></div>   
            </div>
        </div>
        <div v-if="!widget.active" @click="executeWidget" class="activate">
            <p>Activeer Widget</p>
        </div>
        <div v-if="widget.active" @click="cancelEvent" class="activate">
            <p>Cancel Widget</p>
        </div>
    </div>
</template>

<script>
import * as db from '../database'
export default {
    name: "Widget",
    props: ["widget"],
    data(){
        return {
            hours: '00',
            minutes: '00',
            seconds: '00',
            duration: this.widget.event_duration,
            canceled: false
        }
    },
    computed: {
        cssVars(){
            return {
                '--background': this.widget.color
            }
        }
    },
    methods: {
        async remove(){
            const result = await db.default.removeWidget(this.widget.id)
            console.log(result)
            this.$emit("del-widget")
        },
        async executeWidget(){
            let event = {
                doors: this.widget.doors,
                state: true,
                duration: this.widget.duration,
                widget: this.widget
            }
            let result = await db.default.insertEvent(event)
            console.log(result)
            if (result != undefined){
                this.widget.active = true
                console.log("starting countdown")
                this.startCountDown()
            }  
        },
        startCountDown(){
            this.duration--
            this.setTime(this.duration)
            if (this.duration > 0 && !this.canceled){
                setTimeout(this.startCountDown,1000)
            }
            else{
                this.canceled = false
                this.widget.active = false;
                this.widget.event_id = -1;
                this.duration = this.widget.duration
                this.setTime(this.duration)
            }
        },
        cancelEvent(){
            this.duration = this.widget.duration
            this.canceled = true
            db.default.cancelEvent(this.widget.event_id)
        },
        setTime(duration){
            let hours = Math.floor((duration / 3600))
            duration = duration % 3600
            let minutes = Math.floor((duration / 60));
            duration = duration % 60;
            this.hours = hours > 9 ? hours : `0${hours}`;
            this.minutes = minutes > 9 ? minutes : `0${minutes}`;
            this.seconds = duration > 9 ? duration : `0${duration}`;
        }
    },
    created(){
        // calculate hour, minute, seconds
        this.setTime(this.widget.duration)
        if (this.widget.active){
            this.startCountDown()
        }
    }
}
</script>

<style scoped>

    .widget {
        width: 100%;
        box-shadow: 0 .15rem 1.5rem 0 rgba(58, 59, 69, .5);
        border-radius: 10px;
        position: relative;
    }


    /* .widget:hover{
        cursor: pointer;
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    } */

    /*.iconcontainer{
        
        height: 100%;
        background: var(--background);
        border-top-left-radius: 1em;
        border-bottom-left-radius: 1em;
        padding: 0.7em;
        box-shadow: .15rem 0 1.5rem 0 rgba(58, 59, 69, .5);
    }*/

    .content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 1em;
        font-family: 'Oswald';
        margin-left: 1em;
    }

    .icons {
       justify-content: space-between;
    }

    .icon{ 
        margin: 10px;
        width: 45px;
        height: 45px;
        display: inline-block;
    }

    .buttons {
        display: flex;
        padding: 1em;
       
    }

    #kleur {

        color: black;

    }

    .button {    
        flex-basis: 50%;
    }

    .button:hover {
        transform: scale(1.2);
    }

    .activate {
        background-color: var(--background);
        padding: 0.2em;
        cursor: pointer;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        width: 100%;
        position: absolute;
        bottom: 0;
    }

    .activate p{
        font-family: 'Oswald';
        font-size: 1.2em;
        margin-top: 0.5em;
        cursor: pointer;
    }

    h2 {
        color:  rgba(58,96,208,1);
        bottom: 0;
    }

    .doors{
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .fa-bolt{
        color: rgb(58, 208, 121);
        /* stroke: black;
        stroke-width: 2px; */
        
        /*box-shadow: 0 0 0 0 rgba(0,0,0,1);*/
        transform: scale(1);
        animation: pulse 1.5s infinite;  
    } 

    .active {
        font-size: 1.1em;
        margin-bottom: 1em;	  

    }

    .widget widget {
        width: 50%;
    }

    .time {
        font-size: 1.22em;
    }


    @keyframes pulse {
        0% {
            transform: scale(1);
            /*box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);*/
        }

        70% {
            transform: scale(1.4);
            /*box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);*/
        }

        100% {
            transform: scale(1);
            /*box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);*/
        }
    }


</style>