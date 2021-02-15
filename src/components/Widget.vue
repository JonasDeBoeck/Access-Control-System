<template>
    <div @click="executeWidget" class="widget" :style="cssVars">
        <div class="iconcontainer">
            <img class="icon" :src="require(`../assets/icons/${this.widget.icon}.png`)" alt="icoon">    
        </div>
        <div class="content">
            <h2>{{widget.name}}</h2>
            <div class="doors">
                <p class="door" v-for="door in widget.doors" v-bind:key="door.id">{{door.name}}</p>
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
                <div class="divbutton">
                    <button  class="button" style="background: #94cc6e; margin-top: 10px"> <router-link :to="{ name: 'WidgetDetails', params: {id: widget.id}}" >  <i class="fas fa-edit "></i> </router-link></button>
                </div>
                <div class="divbutton">
                    <button @click="remove" class="button" style="background: #d65e5e; margin-bottom: 10px"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
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
            seconds: '00'
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
       executeWidget(){
        //    let event = {

<<<<<<< HEAD
        //    }
        //    db.default.insertEvent()
       },
       updateSize(){
        let widgets = document.getElementsByClassName("widget");
        if (widgets.length > 0){
            // - 6 vanwege de border, de border is 3px
            let widgetHeight = widgets[0].offsetHeight - 6;
            let iconContainers = document.getElementsByClassName("iconcontainer")
            iconContainers.forEach(element => {
                element.style.height = `${widgetHeight}px`;
            });
        }
=======
>>>>>>> e9be270bf90e70ff46f7d10cb03ef63bfd8ef5c9
       }
    },
    created(){
        // calculate hour, minute, seconds
        let duration = this.widget.duration
        console.log(duration)
        let hours = Math.floor((duration / 3600))
        duration = duration % 3600
        console.log(duration)
        let minutes = Math.floor((duration / 60));
        duration = duration % 60;
        console.log(duration)
        this.hours = hours > 9 ? hours : `0${hours}`;
        this.minutes = minutes > 9 ? minutes : `0${minutes}`;
        this.seconds = duration > 9 ? duration : `0${duration}`;
    }
}
</script>

<style scoped>
    .widget {
        border: 3px solid;
        border-color: var(--background);
        width: 100%;
        height: 100%;
        border-radius: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 .15rem 1.5rem 0 rgba(58, 59, 69, .5);
        margin-left: 2em;
        /* max-width: 27vw; */
    }

    .widget:hover{
        cursor: pointer;
        /* transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); */
    }

    .iconcontainer{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        flex-basis: 20%;
        background: var(--background);
        border-top-left-radius: 1em;
        border-bottom-left-radius: 1em;
        padding: 0.7em;
        box-shadow: .15rem 0 1.5rem 0 rgba(58, 59, 69, .5);
    }

    .content{
        width: fit-content;
        flex-basis: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 1em;
        font-family: 'Oswald';
        margin-left: 1.5em;
    }

    .icon{ 
        margin: 10px;
        width: 45px;
        height: 45px;
    }

    .icons{
        flex-basis: 15%;
        display: flex;
    }

    .time{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .time > p {
        margin: 0;
    }

    .clock{
        align-self: center;
        justify-self: center;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 4vh;
        height: 4vh;
        border-radius: 50%;
        border: 2px solid #123456
    }

    .button{
        display:flex;
        justify-content: center;
        align-items: center;
        width: 4vh;
        height: 4vh;
        border-radius:50%;
        /* padding:10px; */
        /* border-radius: 10px; */
        /* margin-bottom: 1em; */
        border: none;
        box-shadow: 0 .15rem 1.5rem 0 rgba(58, 59, 69, .5);
        margin-right: 1em;
    }

    .button:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .divbutton{
        margin: 10px;
    }

    .buttons{
        display:flex;
        flex-direction: column;
        align-items: space-evenly;
    }

    h2 {
        color:  rgba(58,96,208,1);
    }

    .doors{
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .door{
        margin-right: 10px;
    }

    @media only screen and (max-width: 1600px) {
        .iconcontainer{
            height: 100%;
        }
    }
</style>