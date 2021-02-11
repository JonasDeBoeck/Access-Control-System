<template>
    <div class="widget-complete">
        <div class="widget" :style="cssVars">
            <div class="iconcontainer">
                <img class="icon" :src="require(`../assets/icons/${this.widget.icon}.png`)" alt="icoon">    
            </div>
            <div class="content">
                <h2>{{widget.name}}</h2>
                <div class="doors">
                    <p v-for="door in widget.doors" v-bind:key="door.id">{{door.name}}</p>
                </div>
            </div>
            <div class="buttons">
            <div class="button">
                <button class="button" style="background: #94cc6e"><router-link :to="{name: 'WidgetDetails', params: {id: this.widget.id}}" tag="div"><i class="fas fa-edit "></i></router-link></button>
            </div>
            <div class="button">
                <button @click="remove" class="button" style="background: #d65e5e"><i class="fas fa-trash-alt"></i></button>
            </div>
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
       }
    }
}
</script>

<style scoped>
    .widget {
        /* border-left: 5px solid;
        border-bottom: 5px solid; */
        /* padding: 10px; */
        border: 5px solid;
        border-color: var(--background);
        width: 100%;
        height: 100%;
        border-radius: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 .15rem 1.5rem 0 rgba(58, 59, 69, .5);
    }

    .iconcontainer{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        flex-basis: 20%;
        background: var(--background);
    }

    .content{
        width: fit-content;
        flex-basis: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 1em;
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
    }
    /* .fas{
        color: white;
    } */
    .buttons{
        display:flex;
        flex-direction: column;
        align-items: space-evenly;
    }
</style>