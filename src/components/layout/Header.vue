<template>
    <header class="header">
        <div class="nav">
            <router-link to="/">Home</router-link>
            <router-link to="/doors">Overzicht deuren</router-link>
            <router-link to="/widgets">Widgets</router-link>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>
.header {
    background-color: gray;
    height: 100%;
}

.nav {
    display: flex;
    flex-direction: column;
}
</style>