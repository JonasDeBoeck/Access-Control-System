<template>
    <header class="header">
        <div class="wrapper">
            <div>
            <h1>ACS 🔒</h1>
            </div>
            <hr class="sidebar-divider">
            <div class="nav" :key="loggedIn">
                <nav v-if="this.$session.has('bs-session-id')">
                    <router-link to="/" tag="li" class="links"><span id="portal"><i class="fas fa-home"></i>Portaal<i class="fas fa-angle-left arrow"></i></span></router-link>
                    <hr class="sidebar-divider">
                    <router-link to="/doors" tag="li" class="links"><span><i class="fas fa-door-open"></i>deuren<i class="fas fa-angle-left arrow"></i></span></router-link>
                    <hr class="sidebar-divider">
                    <router-link to="/widgets" tag="li" class="links"><span><i class="fas fa-cogs"></i>Widgets<i class="fas fa-angle-left arrow" ></i></span></router-link>
                    <hr class="sidebar-divider">
                </nav>
                <nav v-if="!this.$session.has('bs-session-id')">
                    <router-link to="/" tag="li" class="links"><span id="portal"><i class="fas fa-home"></i>Portaal<i class="fas fa-angle-left arrow"></i></span></router-link>
                    <hr class="sidebar-divider">
                    <router-link @click.native="notAuthenticated" to="" tag="li" class="links" style="color: lightgray"><span><i class="fas fa-door-open"></i>deuren<i class="fas fa-angle-left arrow"></i></span></router-link>
                    <hr class="sidebar-divider">
                    <router-link @click.native="notAuthenticated" to="" tag="li" class="links" style="color: lightgray"><span><i class="fas fa-cogs"></i>Widgets<i class="fas fa-angle-left arrow" ></i></span></router-link>
                    <hr class="sidebar-divider">
                </nav>

                <li to="/" class="logout" @click="logout"><span><i class="fas fa-sign-out-alt"></i>Log out</span></li>

            </div>
        </div>
    </header>
</template>

<script>

export default {
    name: "Header",
    // loggedIn prop zorgt voor het reloaden van de header component
    props: ["loggedIn"],
    methods: {
        logout(){
            this.$session.remove("bs-session-id");
            this.$router.push({path: '/'});
            // Emit event naar parent om loggedIn aan te passen
            this.$emit("logOut")
        },
        notAuthenticated() {
            this.$toasted.show(`Gelieve u eerst te authenticeren.`, {
                theme: "toasted-primary",
                position: "top-right",
                duration: 1000,
                icon: 'times-circle',
                iconPack: 'fontawesome',
                type: 'error'
            })
        },
    }
}
</script>

<style scoped>
.header {
    background: #4e73df;
    background: linear-gradient(135deg, rgba(78,115,223,1) 50%, rgba(58,96,208,1) 100%);
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
}

.nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 1em;
    font-family: 'Oswald';
    text-transform: uppercase;
}

.logout {
    color: lightgrey;
    margin-right: 1.8em;
}

.logout:hover {
    color: #fff;
    cursor: pointer;
}
 
.links {
    color: lightgray;
    text-decoration: none;
}

.wrapper {
    height: 100%;
    margin-top: 2em;
}

hr {
    width: 85%;
    border: 0;
    box-sizing: content-box;
    color: #fff;
    /*height: 1px;*/
    background: linear-gradient(to right, rgba(0, 0, 0, 0), #fff, rgba(0, 0, 0, 0));
}

.sidebar-divider {
    margin: 1rem 1rem 1rem
}

h1 {
    margin: 0;
    font-family: 'Oswald';
    font-weight: normal;
    color: #fff;
    font-size: 3rem;
}

i {
    margin-left: 1rem;
    margin-right: 1rem;
}


span:hover {
    color: white;
    cursor: pointer;
}

nav li.router-link-exact-active {
    color: white;
    
}

nav li.router-link-exact-active .arrow {
    transform: rotate(180deg);
}

.arrow {
    transition: transform .4s ease-in-out;  
}


</style>