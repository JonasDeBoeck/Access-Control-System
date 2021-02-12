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
         <div class= "statusbuttons">
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
      <div class="card opentimegroup">
         <h5 class="card-header">
            Tijd instellen
         </h5>
         <form>
            <div class="opentimeform">
               <div class="form-group">
                  <label>Minuten</label>
                  <input type="number" min=0 class="form-control" v-model= "door.open_duration_min">
               </div>
               <div class="form-group">
                  <label>Seconden</label>
                  <input type="number" v-model="door.open_duration_sec" min=0 max=60 class="form-control">
               </div>
               <input type="submit" v-on:click="updateOpen_Duration" value="Opslaan" id="saveinformation" class="btn btn-primary"/>
            </div>
         </form>
      </div>
   <div class="lastusers card">
      <h5 class="card-header">
         Last Users
      </h5>
      <table class="table table-bordered">
         <thead>
            <tr>
               <th scope="col">#</th>
               <th scope="col">Gebruiker</th>
               <th scope="col">Tijd</th>
            </tr>
         </thead>
         <tbody>
            <tr>
               <th scope="row">1</th>
               <td>Mark</td>
               <td>12:30</td>
            </tr>
            <tr>
               <th scope="row">2</th>
               <td>Johan</td>
               <td>11:45</td>
            </tr>
            <tr>
               <th scope="row">3</th>
               <td>Francis</td>
               <td>11:30</td>
            </tr>
            <tr>
               <th scope="row">4</th>
               <td>Jef</td>
               <td>11:15</td>
            </tr>
         </tbody>
      </table>
   </div>
   <div class="options card">
      <h5 class="card-header">Options</h5>
      <div class="optionsform">
         <form>
            <div class="form-group">
               <label for="">Naam</label>
               <input type="text" class="form-control" v-bind:placeholder= "this.details.Door.name">
            </div>
            <div class="form-group">
               <label>Groep</label>
               <select class="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
               </select>
            </div>
            <div class="form-group">
               <label for="">Omschrijving</label>
               <textarea class="form-control" v-bind:placeholder= "this.details.Door.description" rows="3"></textarea>
            </div>
            <div class="form-group">
               <label>Entry Device</label>
               <select class="form-control">
                  <option>{{this.details.Door.entry_device_id.name}}</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
               </select>
            </div>
            <div class="form-group">
               <label>Deur Relay</label>
               <select class="form-control">
                  <option>{{this.details.Door.relay_output_id.device_id.name}}</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
               </select>
            </div>
            <input type="submit" value="Opslaan" id="saveinformation" class="btn btn-primary"/>
         </form>
      </div>
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
         door: {id: 1, name: 'K2.09', opened: false, open_duration_min: 0, open_duration_sec: 0},
         details: {
            Door: {
               description: "",
               entry_device_id: {
                  name: ""
               },
               relay_output_id: {
                  name: "",
                  device_id: ""
               }
            }
         }
      }
   },
   async created() {
      this.door.id = this.$route.params.id
      let detail = await f.default.getDoorDetail(this.door.id, this.$session.get("bs-session-id"))
      this.details = detail
      this.door.open_duration_min = Math.floor(this.details.Door.open_duration/60)
      this.door.open_duration_sec =  this.details.Door.open_duration % 60;
      this.pollStatus(this.door_id)
      },
   methods: {
      async lock() {
            this.door.opened = false
            let key = await f.default.login("admin", "t");
            f.default.lockDoor(this.door.id, key);
      },

      async unlock() {
            this.door.opened = true
            let key = await f.default.login("admin", "t");
            f.default.unlockDoor(this.door.id, key);
      },

      async pollStatus(){
         let detail = await f.default.getDoorDetail(this.door.id, this.$session.get("bs-session-id"))
         let detailStatus = await f.default.getDoorDetailStatus(this.door.id, this.$session.get("bs-session-id"))
         this.door.opened = detailStatus
         this.details = detail
         setTimeout(this.pollStatus,3000)
      },

      async updateOpen_Duration(){
         let seconds = this.door.open_duration_sec
         let minutes = this.door.open_duration_min
         let totalSeconds = (minutes * 60)
         totalSeconds += seconds*1
         f.default.updateDoorOpen_Duration(this.door.id, totalSeconds, this.$session.get("bs-session-id"))
      }
   }
}
</script>

<style scoped>
.detail {
   font-family: 'Oswald';
}

input, textarea, select, option {
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
   color: rgba(58,96,208,1);
   margin: 0;
   font-family: 'Oswald';
   text-transform: uppercase;
}

.deurdetail{
   display: grid;
   grid-template-columns: 1fr 33% 33%;
   text-align: left;
   row-gap: 9%;
   column-gap: 5%;
   margin-left: 2.5em;
   margin-right: 2.5em;
   margin-top: 2.5em;
   height: 80%;
   grid-template-areas: "status opentimegroup lastusers"
             "options options lastusers";
}

.lastusers{
   background-color: #fff;
   border-radius: .35rem;
   box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
   grid-area: lastusers;
}

.opentimegroup{
   background-color: #fff;
   border-radius: .35rem;
   box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
   grid-area: opentimegroup;
}

.status{
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
   color: rgba(58,96,208,1)
}

h5 {
   color: rgba(58,96,208,1)
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

.options{
   background-color: #fff;
   border-radius: .35rem;
   display: flex;
   box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
   grid-area: options;
}

.statusbuttons{
   display:flex;
   justify-content: space-between;
}

textarea {
   resize: none;
}

.optionsform form{
   width: 70%;
}

.optionsform form input[type=submit] {
   float: right;
}

.optionsform form input, .optionsform form textarea, .optionsform form select {
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
</style>