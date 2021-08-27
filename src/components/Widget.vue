<template>
    <div class="widget" :style="cssVars">
        <div @click="executeWidget" class="iconcontainer">
            <img class="icon" :src="require(`../assets/icons/${this.widget.icon}.png`)" alt="icoon">    
        </div>
        <div  class="content ">
            <h2>{{widget.name}}</h2>
            <div class="doors">
                <p class="door" v-for="door in this.showDoors" v-bind:key="door">{{door}}</p>
            </div>
            <div v-bind:class="{'is-active': widget.active, 'not-active':!widget.active}" class="active">
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
                <div  class="button" id="kleur"><router-link :to="{ name: 'WidgetDetails', params: {id: widget.id}}" > <i class="fas fa-edit fa-2x"></i> </router-link></div>
                <div @click="checkRemove" class="button"><i class="fas fa-trash-alt fa-2x"></i></div>   
            </div>
        </div>
        <div v-if="!widget.active" @click="executeWidget" class="activate">
            <p>Activeer Widget</p>
        </div>
        <div v-if="widget.active" @click="cancelEvent" class="activate">
            <p>Annuleer Widget</p>
        </div>
        <vue-modal-2 class="vue-modal-2" :name = "warning" @on-close="closeWarning" 
            noHeader
            wrapperBg="rgba(0, 0, 0, 0.10)"
            :footerOptions="{btn1: 'Annuleer', 
                            btn2: 'Bevestig', 
                            btn1OnClick: () => { closeWarning(); },
                            btn2OnClick: () => { removeAndCancelWidget(); }
                            }">
            <div class="wrapper">
                <div class="wrapper-icon">
                    <i class="fas fa-exclamation-triangle fa-2x"></i>
                </div>
                <div class="wrapper-text">
                    <p>Deze widget is actief, als je deze verwijderd wordt het event ook gecancelled</p>
                </div>
            </div>
        </vue-modal-2>
        <vue-modal-2 class="vue-modal-2" :name = "confirmation" @on-close="closeConfirmation" 
            noHeader
            wrapperBg="rgba(0, 0, 0, 0.10)"
            :footerOptions="{btn1: 'Annuleer', 
                            btn2: 'Bevestig', 
                            btn1OnClick: () => { closeConfirmation(); },
                            btn2OnClick: () => { remove(); }
                            }">
            <div class="wrapper">
                <div class="wrapper-icon">
                    <i class="fas fa-exclamation-circle fa-2x"></i>
                </div>
                <div class="wrapper-text">
                    <p>Ben je zeker dat je deze widget wilt verwijderen</p>
                </div>
            </div>
        </vue-modal-2>
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
            canceled: false,
            confirmation: "confirmation" + this.widget.id.toString(),
            warning: "warning " + this.widget.id.toString(),
            active: false,
            showDoors: []
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
        checkRemove(){
            if (this.widget.active){
                this.$vm2.open(this.warning)
            }
            else{
                this.$vm2.open(this.confirmation)
            }
        },
        async remove(){
            const result = await db.default.removeWidget(this.widget.id)
            this.$vm2.close(this.confirmation)
            this.$emit("del-widget")
            this.$toasted.show(`${this.widget.name} Succesvol verwijderd!`, {
                theme: "toasted-primary",
                position: "top-right",
                duration: 2800,
                icon: 'cogs',
                iconPack: 'fontawesome',
                type: 'success'
            })
        },
        async executeWidget(){
            let event = {
                doors: this.widget.doors,
                state: true,
                duration: this.widget.duration,
                widget: this.widget
            }
            let result = await db.default.insertEvent(event)
            if (result.data.success){
                this.widget.event_id = result.data.id;
                this.widget.active = true
                this.duration = this.widget.duration
                this.startCountDown()

                this.$toasted.show(`${this.widget.name} Succesvol Gestart!`, {
                    theme: "toasted-primary",
                    position: "top-right",
                    duration: 2000,
                    icon: 'cogs',
                    iconPack: 'fontawesome',
                    type: 'success'
                })
            } 
            else{
                this.$toasted.show(`${this.widget.name} Kon niet starten!`, {
                    theme: "toasted-primary",
                    position: "top-right",
                    duration: 2000,
                    icon: 'cogs',
                    iconPack: 'fontawesome',
                    type: 'error'
                })
            }
            // force update rerender 
            this.$forceUpdate();
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
        async cancelEvent(){
            if (this.widget.event_id === -1){
                // event bestaat niet (meer)
                this.$vm2.close(this.warning)
            }
            else{
                this.duration = this.widget.duration
                this.canceled = true
                await db.default.cancelEvent(this.widget.event_id)
                this.$toasted.show(`${this.widget.name} Succesvol gecancelled!`, {
                    theme: "toasted-primary",
                    position: "top-right",
                    duration: 1500,
                    icon: 'cogs',
                    iconPack: 'fontawesome',
                    type: 'success'
                })
            }
            
        },
        setTime(duration){
            let hours = Math.floor((duration / 3600))
            duration = duration % 3600
            let minutes = Math.floor((duration / 60));
            duration = duration % 60;
            this.hours = hours > 9 ? hours : `0${hours}`;
            this.minutes = minutes > 9 ? minutes : `0${minutes}`;
            this.seconds = duration > 9 ? duration : `0${duration}`;
        },
        closeConfirmation(){
            this.$vm2.close(this.confirmation)
        },
        async removeAndCancelWidget(){
            await this.cancelEvent()
            this.$vm2.close(this.warning)
            await this.remove()
        },
        closeWarning(){
            this.$vm2.close(this.warning)
        }
    },
    created(){
        // calculate hour, minute, seconds
        this.setTime(this.widget.duration)
        if (this.widget.active){
            this.startCountDown()
        }
        if (this.widget.doors.length > 3) {
            this.showDoors = [this.widget.doors[0].name, this.widget.doors[1].name, this.widget.doors[2].name, "..."]
        } else {
            Array.from(this.widget.doors).forEach(door => this.showDoors.push(door.name))
        }
    }
}
</script>

<style scoped>

    .widget {
        width: 100%;
         box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
        transition: box-shadow 0.3s ease-in-out;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .widget:hover {
        box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .5);
        transition: box-shadow 0.3s ease-in-out;
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
        bottom: 20px;
    }

    #kleur {

        color: black;

    }

    .button {    
        flex-basis: 50%;
        cursor: pointer;
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
        flex-direction: column;
    }

    .is-active{
        color: rgb(58, 208, 121);
        /* stroke: black;
        stroke-width: 2px; */
        
        /*box-shadow: 0 0 0 0 rgba(0,0,0,1);*/
        transform: scale(1);
        animation: pulse 1.5s infinite;  
    }

    .not-active{
        color: grey;
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

    .wrapper{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .wrapper-icon{
        flex-basis: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .wrapper-text{
        flex-basis: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1em 0px 1em 0px;
    }

    .fa-exclamation-circle{
        color: #17a2b8;
    }

    .fa-exclamation-triangle{
        color: #dc3545;
    }

    .fa-trash-alt{
        color: #dc3545;
    }

    .fa-trash-alt:hover{
        color: #aa2330;
    }

    .fa-bolt {
        font-size: 1.5em;
    }

    @media only screen and (max-width: 992px) {
        .activate {
            position: initial;
        }
    }

    @keyframes pulse {
        0% {
            transform: scale(0.7);
            /*box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);*/
        }

        70% {
            transform: scale(0.9);
            /*box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);*/
        }

        100% {
            transform: scale(0.7);
            /*box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);*/
        }
    }


</style>