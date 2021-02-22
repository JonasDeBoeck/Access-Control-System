<template>
  <div class="home">
    <div class="head">
      <h1>PORTAAL</h1>
    </div>
    <div v-if="!this.$session.has('bs-session-id')" class="wrapper">
      <div id="login">
        <form>
          <h2>Log in</h2>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="button" @click="login" :disabled="loggedIn">Log in</button>
        </form>
      </div>
    </div>
    <div v-if="this.$session.has('bs-session-id')" class="wrapper">
      <h2>Top 5 meest gebruikte widgets</h2>
      <div v-if="top5WidgetsUsed.length > 0" class="widgets">
        <Widget class="widget" v-for="widget in top5WidgetsUsed" v-bind:key="widget.name" v-bind:widget="widget" />
      </div>
    </div>
    <div v-if="this.$session.has('bs-session-id') &&  activeWidgets.length > 0" class="wrapper">
      <h2>Actieve widgets</h2>
      <div class="widgets">
        <Widget class="widget" v-for="widget in  activeWidgets" v-bind:key="widget.name" v-bind:widget="widget" />
      </div>
    </div>
  </div>
</template>

<script>
  import * as db from '../database'
  import * as api from "../variables"
  import Widget from '@/components/Widget'

  export default {
    name: "Header",
    async created() {
      this.pollTopWidgets()
      this.pollActiveWidgets()
    },
    components: {
      Widget
    },
    data() {
      return {
        loggedIn: this.$session.has("bs-session-id"),
        top5WidgetsUsed: [],
        activeWidgets: []
      }
    },
    methods: {
      async login() {
        console.log("login")
        let key = await api.default.login("admin", 't')
        this.$session.set("bs-session-id", key)
        this.loggedIn = true;
        // Emit event naar parent zo dat header kan worden gereload
        this.$emit("logIn")
        console.log(this.$session.getAll())
      },
      async pollTopWidgets() {
        this.top5WidgetsUsed = await db.default.top5WidgetsUsed()
        setTimeout(this.pollTopWidgets, 3000)
      },
      async pollActiveWidgets() {
        const temp = await db.default.getActiveWidgets()
        this.activeWidgets = temp
        setTimeout(this.pollActiveWidgets, 3000)
      }
    }
  }
</script>


<style scoped>
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 2.5em;
    padding-right: 2.5em;
    padding-top: 1em;
    padding-bottom: 1em;
    background: #fff;
    box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
  }

  h1 {
    color: rgba(58, 96, 208, 1);
    margin: 0;
    font-family: 'Oswald';
    text-transform: uppercase;
  }

  .wrapper {

    display: flex;
    justify-content: center;
    margin-top: 4em;
    flex-direction: column;
  }

  #login {
    background: linear-gradient(135deg, rgb(98, 131, 230) 50%, rgb(48, 93, 228) 100%);
    width: 25%;
    min-height: 25%;
    height: 30%;
    display: flex;
    flex-direction: column;
    border-radius: 0.8em;
    box-shadow: 0 .3rem 3rem 0 rgba(0, 0, 0, .15);
    border: 1px solid #305bdb;
  }


  form {
    display: flex;
    flex-direction: column;
    padding: 50px;
  }

  h2 {
    color: rgba(58, 96, 208, 1);
    margin: 0;
    font-family: 'Oswald';
    text-transform: uppercase;
  }


  input {
    height: 35px;
    padding: 5px 5px;
    margin: 10px 0px;
    background-color: #e0dada;
    border: none;
    border-radius: 0.1em;
  }

  button {
    height: 40px;
    padding: 5px 5px;
    margin: 10px 0px;
    font-weight: bold;
    background-color: #1337a3;
    ;
    border: none;
    color: #e0dada;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    font-size: 16px;
    border-radius: 0.5em
  }

  button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .widgets {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    column-gap: 5%;
    row-gap: 10%;
    margin: 5%;
  }

  .widget {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 120%;
  }

  .door {
    margin-right: 0;
  }

  @media screen and (max-width: 780px) {
    section {
      width: 90%;
    }
  }
</style>