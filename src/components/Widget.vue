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
        <div class="buttons"> 
            <div class="divbutton">
                <button  class="button" style="background: #94cc6e"><router-link :to="{name: 'WidgetDetails', params: {id: this.widget.id}}" tag="div"><i class="fas fa-edit "></i></router-link></button>
            </div>
            <div class="divbutton">
                <button @click="remove" class="button" style="background: #d65e5e"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Widget",
    props: ["widget"],
    data(){
        return {
            
        }
    },
    computed: {
        cssVars(){
            return {
                '--background': this.widget.colour
            }
        }
    },
    methods: {
       remove(){
           this.$emit("del-widget",this.widget.id)
       },
       executeWidget(){

       }
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
    }

    .widget:hover{
        cursor: pointer;
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

    .link{
        flex-basis: 10%;
    }

    .icon{ 
        margin: 10px;
        width: 45px;
        height: 45px;
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
</style>