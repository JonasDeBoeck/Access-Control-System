<template>
    <div class="widget" :style="cssVars">
        <h2>{{widget.name}}</h2>
    </div>
</template>

<script>
export default {
    name: "Widget",
    props: ["widget"],
    computed: {
        cssVars(){
            return {
                '--background': this.widget.colour
            }
        }
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
        justify-content: center;
        flex-direction: column;
        box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
    }
</style>