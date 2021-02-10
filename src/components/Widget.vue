<template>
    <div class="widget" :style="cssVars">
        <img class="icon" :src="require(`../assets/icons/${this.widget.icon}.png`)" alt="icoon">
        <div class="content">
            <h2>{{widget.name}}</h2>
            <div class="doors">
                <p v-for="door in widget.doors" v-bind:key="door.id">{{door.name}}</p>
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
        
    }
}
</script>

<style scoped>
    .widget {
        background-color: var(--background);
        width: 100%;
        height: 100%;
        border-radius: .35rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
    }

    .content{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .icon{ 
        margin: 10px;
        width: 45px;
        height: 45px;
    }
</style>