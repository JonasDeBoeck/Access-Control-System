<template>
    <header class="header">
        <div class="wrapper">
            <div>
            <h1>LOGO</h1>
            </div>
            <hr>
            <div class="nav">
                <router-link to="/" class="links">Portaal</router-link>
                <hr>
                <router-link to="/doors" class="links">Overzicht deuren</router-link>
                <router-link to="/widgets" class="links">Widgets</router-link>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

.header {
    background: rgb(78,115,223);
    background: linear-gradient(135deg, rgba(78,115,223,1) 50%, rgba(58,96,208,1) 100%);
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
}

.nav {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 1.5em;
}
 
.links {
    color: white;
    text-decoration: none;
}

.wrapper {
    height: 100%;
    margin-top: 2em;
}

hr {
    width: 80%;
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #858796, rgba(0, 0, 0, 0));
}

h1 {
    margin: 0;
    font-style: 'Lobster', cursive;
}
</style>