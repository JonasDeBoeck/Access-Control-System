<template>
  <div class="home">
    <div class="head">
      <h1>HOME</h1>
    </div>
    <div v-if="!this.$session.has('bs-session-id')" class="wrapper">
        <div id="login" >
          <form>
            <h2>Log in</h2>
            <input type="text" placeholder="Username" />
            <input type="password"  placeholder="Password" />
            <button type="button" @click="login" :disabled="loggedIn">Log in</button>
          </form>
        </div>
    </div>
  </div>
</template>

<script>

import * as api from "../variables"
export default {
    name: "Header",
    data() {
        return {
            loggedIn: this.$session.has("bs-session-id")
        }
    },
    methods: {
        async login() {
            let key = await api.default.login("admin",'t')
            this.$session.set("bs-session-id",key)
            this.loggedIn = true;
        },
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
    font-family: 'Oswald';
    color: #4e73df;
  }

  .wrapper {

    display: flex;
    justify-content: center;
    margin-top: 4em;

  }

  #login{
    background: linear-gradient(135deg, rgb(98, 131, 230) 50%, rgb(48, 93, 228) 100%);
    width:25%;
    min-height:25%;
    height: 30%;
    display:flex;
    flex-direction:column;
    border-radius: 0.8em;
    box-shadow: 0 .3rem 3rem 0 rgba(0, 0, 0, .15);
    border:1px solid #305bdb;
  }


  form{
    display:flex;
    flex-direction:column;
    padding: 50px; 
  }

  h2{
    font-family: 'Oswald', sans-serif;
    color:#ffffff;
    margin-left:auto;
    margin-right:auto;
  }


  input{
    height:35px;
    padding: 5px 5px;
    margin: 10px 0px;
    background-color:#e0dada;
    border:none;
    border-radius: 0.1em;
  }

  button{
    height:40px;
    padding: 5px 5px;
    margin: 10px 0px;
    font-weight:bold;
    background-color:#1337a3;;
    border:none;
    color:#e0dada;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    cursor:pointer;
    font-size:16px;
    border-radius: 0.5em
  }

  button:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  @-webkit-keyframes shake{
    from, to{
      -webkit-transform: translate3d(0, 0, 0);
      transform:translate3d(0,0,0);
    }
    10%,30%,50%,70%,90%{
      -webkit-transform: translate3d(-10px, 0, 0);
      transform:translate3d(-10px,0,0);
    }
    20%,40%,60%,80%{
      -webkit-transform: translate3d(10px, 0, 0);
      transform:translate(10px,0,0);
    }
  }

  .shake{
    animation-name: shake;
    animation-duration:1s;
    /*animation-fill-mode: both;*/
  }

  @media screen and (max-width: 780px) {
    section{
      width:90%;
    }
  }
</style>


