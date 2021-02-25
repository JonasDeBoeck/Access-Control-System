<template>
   <div class="detail">
      <div class="head">
         <h1>Deur details</h1>
      </div>
      <div class="deurdetail">
         <div class="status" v-bind:class="{'is-opened':door.opened, 'is-locked':!door.opened}">
            <div class="statuscontainer">
               <h2>Status</h2>
               <p v-if="door.opened">Open</p>
               <p v-if="!door.opened">Gesloten</p>
            </div>
            <div class="statusbuttons">
               <div v-on:click="unlock" v-if="!door.opened" class="lock">
                  <i class="fas fa-lock-open"></i>
                  <small>Open</small>
               </div>
               <div v-on:click="lock" v-if="door.opened" class="lock">
                  <i class="fas fa-lock"></i>
                  <small>Sluit</small>
               </div>
            </div>
         </div>
         <div class="dichtWrapper" v-bind:class="{'is-nietdicht':door.nietdicht}">
            <h2>
               Dicht?
            </h2>
            <div class="lock">
               <div v-on:click="lock" v-if="door.nietdicht" class="open">
                  <img class="icon" :src="require(`../assets/icons/open-door-oh-no.png`)" alt="icoon">
                  <div>
                     <small>Deur is niet dicht</small>
                  </div>
               </div>
               <div v-on:click="lock" v-if="!door.nietdicht" class="dicht">
                  <img class="icon" :src="require(`../assets/icons/closed-door.png`)" alt="icoon">
                  <div>
                     <small>Deur is dicht</small>
                  </div>
               </div>
            </div>
         </div>
         <div class="lastusers card">
            <h5 class="card-header">
               Access Groups - Levels
            </h5>
            <table class="table table-bordered">
               <thead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col">Access Group Name</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="access_group in door.access_groups" v-bind:key="access_group.id">
                     <td>{{number_access_group + 1}}</td>
                     <td>{{access_group.name}}</td>
                  </tr>
               </tbody>
            </table>
            <table class="table table-bordered">
               <thead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col">Access Level Name</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="access_level in door.access_levels" v-bind:key="access_level.id">
                     <td>{{number_access_group + 1}}</td>
                     <td>{{access_level.name}}</td>
                  </tr>
               </tbody>
            </table>
         </div>
         <div class="options card">
            <h5 class="card-header">Informatie</h5>
            <div v-if="errors.length !==null">
               <p class="error" v-for="error in errors" v-bind:key="error.error">{{error.error}}</p>
            </div>
            <div class="optionsform">
               <form>
                  <div class="form-group">
                     <label for="">Naam</label>
                     <input type="text" class="form-control" v-model="door.name">
                  </div>
                  <div class="form-group">
                     <label for="">Groep</label>
                     <input type="text" class="form-control" readonly
                        v-bind:placeholder="details.Door.door_group_id.name">
                  </div>
                  <div class="form-group">
                     <label for="">Omschrijving</label>
                     <textarea class="form-control" v-model="door.description" rows="3"></textarea>
                  </div>
                  <div class="form-group">
                     <label for="">Entry Device</label>
                     <input type="text" class="form-control" readonly
                        v-bind:placeholder="details.Door.entry_device_id.name">
                  </div>
                  <div class="form-group">
                     <label for="">Relay Output</label>
                     <input type="text" class="form-control" readonly
                        v-bind:placeholder="details.Door.relay_output_id.device_id.name">
                  </div>
                  <input type="submit" v-on:click="updateNameDesc" value="Opslaan" id="saveNameDesc"
                     class="btn btn-primary" />
               </form>
            </div>
         </div>
         <div class="monitoring card">
            <h5 class="card-header">
               Monitoring
            </h5>
            <div class="filtering">
               <form class="monitor-filtering">
                  <div class="rij">
                     <div class="events">
                        <div class="event" v-for="event of event_types" :key="event.name">
                           <input @click="checkEventType" type="checkbox" class="btn-check" :id="event.name" :value="event.code" checked="true">
                           <label class="btn btn-outline-primary" :for="event.name">{{event.name}}</label>
                        </div>
                     </div>
                     <div class="form-group">
                        <label for="username">Gebruikersnaam</label>
                        <input type="text" class="form-control" id="username" placeholder="gebruikersnaam">
                     </div>
                  </div>
                  <div class="rij">
                     <div class="input-group">
                        <div class="input-group-prepend">
                           <span class="input-group-text" id="">Start- en einddatum</span>
                        </div>
                        <input @input="setStartDate" id="startDate" type="datetime-local" class="form-control" >
                        <input @input="setEndDate" id="endDate" type="datetime-local" class="form-control" >
                     </div>
                  </div>
                  <button @click="applyFilter" type="button" class="zoek btn btn-primary">Zoek</button>
               </form>
            </div>
            <table class="table table-bordered">
               <thead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col">Naam/Voornaam</th>
                     <th scope="col">Datum</th>
                     <th scope="col">Event</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="event in filtered_users" v-bind:key="event.id">
                     <td>{{event.number}}</td>
                     <td>{{event.user.name}}</td>
                     <td>{{event.date}}</td>
                     <td>{{event.event_name}}</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   </div>
</template>

<script>
   import * as f from '../variables'
   export default {
      name: "DoorDetails",
      data() {
         return {
            door: {
               id: 1, name: '', opened: false, open_duration_min: 0, open_duration_sec: 0, group: "groep",
               access_groups: [],
               access_levels: [],
               description: '',
               nietdicht: true
            },
            details: {
               Door: {
                  description: "",
                  entry_device_id: {
                     name: ""
                  },
                  relay_output_id: {
                     name: "",
                     device_id: ""
                  },
                  door_group_id: {
                     name: ""
                  }
               }
            },
            number_last_users: 0,
            last_users: [],
            filtered_users: [],
            errors: [],
            number_access_group: 0,
            filteroptions:{
               event_code: [],
               user_name: undefined,
               startdate: undefined,
               enddate: undefined,
               limit: 10
            },
            dateChanged: false,
            event_types: [{code:"4102", name: "Success"},{code:"4354", name:"Failed"}] // VERIFY_SUCCESS, VERIFY_FAIL
         }
      },
      async created() {
         this.door.id = this.$route.params.id
         let detail = await f.default.getDoorDetail(this.door.id, this.$session.get("bs-session-id"))
         this.details = detail
         this.door.name = detail.Door.name
         this.door.nietdicht = detail.Door.opened
         this.door.description = detail.Door.description
         this.door.open_duration_min = Math.floor(this.details.Door.open_duration / 60)
         this.door.open_duration_sec = this.details.Door.open_duration % 60
         let result_array = await f.default.getAccesGroupNamesAndLevelsForDoor(this.door.id, this.$session.get("bs-session-id"))
         this.door.access_groups = result_array[0]
         this.door.access_levels = result_array[1]
         this.pollStatus(this.door_id)
         // set startdate to 1 week before the current date
         let now = new Date()
         let current = new Date()
         let lastWeek = new Date(current.setDate(current.getDate() - 7))
         this.filteroptions.startdate = lastWeek
         this.filteroptions.enddate = now
         this.getLastUsers()
         // this.groups.rows = await f.default.getAllAccesGroups(this.$session.get("bs-session-id"))
         // const test = this.groups.rows
         // console.log(test)
         // autofill star-and endDate input fields
         let startDateField = document.getElementById("startDate")
         let endDateField = document.getElementById("endDate")
         startDateField.value = this.formatDate(lastWeek) 
         endDateField.value = this.formatDate(now) 
      },
      methods: {
         async lock() {
            this.door.opened = false
            f.default.lockDoor(this.door.id, this.$session.get("bs-session-id"));
         },
         async unlock() {
            this.door.opened = true
            f.default.unlockDoor(this.door.id, this.$session.get("bs-session-id"));
         },
         async pollStatus() {
            let detail = await f.default.getDoorDetail(this.door.id, this.$session.get("bs-session-id"))
            let detailStatus = await f.default.getDoorDetailStatus(this.door.id, this.$session.get("bs-session-id"))
            this.door.opened = detailStatus
            this.door.nietdicht = detail.Door.opened
            this.details = detail
            setTimeout(this.pollStatus, 3000)
         },
         async updateNameDesc() {
            this.errors = []
            let name = this.door.name
            let description = this.door.description
            if(name === null || name === ""){
               this.errors.push({
                  error: "Naam moet ingevuld worden!"
               })
            }
            if(this.errors.length === 0){
               f.default.updateDoorNameAndDesc(this.door.id, name, description, this.$session.get("bs-session-id"))
            }
         },
         async getLastUsers(){
            // account for timezone difference
            // let startDate = `${this.formatDate(this.filteroptions.startdate)}.000Z`
            // let endDate = `${this.formatDate(this.filteroptions.enddate)}.000Z`
            let lastusers = await f.default.monitoring(this.$session.get("bs-session-id"),1000,this.filteroptions.startdate.toISOString(),this.filteroptions.enddate.toISOString())
            this.last_users = lastusers
            this.filtered_users = this.last_users.slice(0,this.filteroptions.limit)
         },
         filter(event){
            let device_filter = this.details.Door.entry_device_id.id == event.device_id;
            let user_filter = this.filteroptions.user_name === undefined || event.user.name === undefined ? true : event.user.name.indexOf(this.filteroptions) > -1
            let event_type_filter = this.filteroptions.event_code.includes(event.event_code)
            // console.log({
            //    event: event,
            //    device: device_filter,
            //    user: user_filter,
            //    event_type: event_type_filter
            // })
            return device_filter && user_filter && event_type_filter
         },
         checkEventType(e){
            let code = e.target.value
            if (this.filteroptions.event_code.includes(code)){
               let index = this.filteroptions.event_code.indexOf(code)
               this.filteroptions.event_code.splice(index,1)
            }
            else{
               this.filteroptions.event_code.push(code)
            }
         },
         async applyFilter(){
            if(this.dateChanged){
               console.log(this.last_users)
               console.log("resending api call")
               await this.getLastUsers()
               console.log(this.last_users)
            }
            this.filtered_users = this.last_users.filter(this.filter)
            this.filtered_users = this.filtered_users.slice(0,this.filtered_users.limit)
         },
         formatDate(date){
            // 0 = jan, 1 = feb, ...
            let month = date.getMonth() + 1
            let days = date.getDate()
            let minutes = date.getMinutes()
            let hours = date.getHours()
            month = month < 10 ? `0${month}` : month
            days = days < 10 ? `0${days}` : days 
            minutes = minutes < 10 ? `0${minutes}` : minutes 
            hours = hours < 10 ? `0${hours}` : hours 
            return `${date.getFullYear()}-${month}-${days}T${hours}:${minutes}`
         },
         setStartDate(e){
            this.dateChanged = true
            let date = new Date(e.target.value)
            this.filteroptions.startdate = date
            // this.filteroptions.startdate = `${e.target.value}Z`
         },
         setEndDate(e){
            this.dateChanged = true
            let date = new Date(e.target.value)
            this.filteroptions.enddate = date
            // this.filteroptions.enddate = `${e.target.value}Z`
         }
      }
   }
</script>

<style scoped>
   .monitor-filtering{
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-content: center;
   }

   .zoek{
      margin: auto;
      width: 10vw;
      margin-bottom: 1em;
   }

   .events{
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      flex-basis: 50%;
   }
   .rij{
      display: flex;
      justify-content: space-between;
      margin-bottom: 1em;
   }

   .detail {
      font-family: 'Oswald';
      overflow: auto;
      margin-bottom: 1em;
   }

   input,
   textarea,
   select,
   option {
      font-family: Arial, Helvetica, sans-serif;
   }

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

   .deurdetail {
      display: grid;
      grid-template-columns: 1fr 33% 33%;
      text-align: left;
      row-gap: 5%;
      column-gap: 5%;
      margin-left: 1em;
      margin-right: 1em;
      margin-top: 1em;
      margin-bottom: 1em;
      height: 80%;
      grid-template-areas: "status opentimegroup lastusers"
         "options options monitoring";
   }

   .lastusers {
      background-color: #fff;
      border-radius: .35rem;
      box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
      grid-area: lastusers;
   }

   .status {
      background-color: #fff;
      width: 100%;
      height: 100%;
      border-radius: .35rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
      grid-area: status;
      display: flex;
      justify-content: space-evenly;
   }

   .monitoring{
      grid-area: monitoring;
   }

   .dichtWrapper {
      background-color: #fff;
      width: 100%;
      height: 100%;
      border-radius: .35rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
      display: flex;
      justify-content: space-evenly;
   }

   .lock i {
      font-size: 3em;
      margin-bottom: 0.25em;
   }

   .lock {
      display: flex;
      align-items: center;
      flex-direction: column;
   }

   .lock small {
      font-size: 1.25em;
   }

   .statuscontainer {
      display: flex;
      align-items: center;
      flex-direction: column;
   }

   .statuscontainer p {
      font-size: 1.15em;
   }

   .opentimeform {
      margin-left: 1em;
      margin-top: 1em;
      width: 70%;
   }

   h2 {
      color: rgba(58, 96, 208, 1)
   }

   h5 {
      color: rgba(58, 96, 208, 1)
   }

   .opentimeform div input {
      margin-bottom: 0.5em;
   }

   .opentimeform input[type=submit] {
      float: right;
      margin-bottom: 0.5em;
   }

   #saveinformation {
      margin-top: 1em;
   }

   .options {
      background-color: #fff;
      border-radius: .35rem;
      display: flex;
      box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
      grid-area: options;
   }

   .statusbuttons {
      display: flex;
      justify-content: space-between;
   }

   textarea {
      resize: none;
   }

   .optionsform form {
      width: 70%;
   }

   .optionsform form input[type=submit] {
      float: right;
   }

   .optionsform form input,
   .optionsform form textarea,
   .optionsform form select {
      margin-bottom: 0.5em;
   }

   .optionsform {
      margin-left: 1em;
      margin-top: 1em;
   }

   .is-opened {
      border-left: 0.25rem solid green;
   }

   .is-locked {
      border-left: 0.25rem solid red;
   }

   .is-nietdicht {
      border-left: 0.25rem solid orange;
   }

   .open img {
      padding-left: 20%;
   }

   .dicht img {
      padding-left: 15%;
   }

   .error {
      color:red;
   }

   @media only screen and (max-width: 992px) {
      .deurdetail {
         grid-template-columns: 1fr 1fr;
         grid-template-areas: 
            "status opentimegroup"
            "lastusers lastusers"
            "options options"
            "monitoring monitoring";
         height: 100%;
      }

      .options {
         margin-bottom: 2.5em;
      }

      .detail {
         overflow: visible;
      }
   }
</style>