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
        </div>
        <div class="buttons">
            <div class="button">
                <button class="button" style="background: #6295d9"><router-link :to="{name: 'WidgetDetails', params: {id: this.widget.id}}" tag="div"><i class="fas fa-edit fa-2x"></i></router-link></button>
            </div>
            <div class="button">
                <button @click="this.removeWidget(widget.id)" class="button" style="background: #db2c2c"><i class="fas fa-trash-alt fa-2x"></i></button>
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
        removeWidget(id){
            console.log(id)
        }
    }
}
</script>

<style scoped>
    .widget {
        border-left: 5px solid;
        border-bottom: 5px solid;
        border-color: var(--background);
        width: 100%;
        height: 100%;
        border-radius: .35rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
    }

    .iconcontainer{
        flex-basis: 20%;
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
        width: 4vw;
        height: 4vw;
        border-radius:50%;
        border: none;
    }
    .buttons{
        display:flex;
        justify-content: space-evenly;
    }
</style>