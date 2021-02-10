<template>
   <div>
   <h1>Deur Detail</h1>
   <div class="deurdetail">
      <div class="status">
      <h2>Status</h2>
         <div class= "statusbuttons">
            <input type="submit" id="open" value="Open"/>
            <input type="submit" id="close" value="Sluit"/>
         </div>
      </div>
      <div class="opentimegroup">
         <form>
            <div class="input-group mb-1">
               <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Tijd open</span>
               </div>
               <input type="number" min=0 class="form-control" placeholder="Dagen" aria-label="Username" aria-describedby="basic-addon1">
               <input type="number" min=0 class="form-control" placeholder="Minuten" aria-label="Username" aria-describedby="basic-addon1">
               <input type="number" min=0 class="form-control" placeholder="Seconden" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            <br>
            <div class="input-group mb-1">
               <div class="input-group mb-3">
               <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">Groep</label>
               </div>
               <select class="custom-select" id="inputGroupSelect01">
               <!--TODO zet hier nog effectieve opties-->
                  <option selected>Kies...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
               </select>
               </div>
            </div>
            <input type="submit" value="Opslaan" id="saveinformation"/>
         </form>
      </div>
   <div class="lastusers">
      <h2>Laatste gebruikers</h2>
      <!--TODO zet hier nog effectieve opties-->
      <ul>
         <li>[time] - [user1]</li>
         <li>[time] - [user2]</li>
         <li>[time] - [user3]</li>
         <li>[time] - [user4]</li>
         <li>[time] - [user5]</li>
      </ul>
   </div>
   <div class="options">
      <h2>Options</h2>
         <form>
            <div class="input-group mb-1">
               <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Omschrijving</span>
               </div>
               <input type="text" class="form-control" placeholder="Omschrijving" aria-label="Username" aria-describedby="basic-addon1">
               </div>
            <div class="input-group mb-1">
               <div class="input-group mb-1">
               <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">Entry Device</label>
               </div>
               <select class="custom-select" id="inputGroupSelect01">
                  <!--TODO zet hier nog effectieve opties-->
                  <option selected>Kies...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
               </select>
               </div>
            </div>
            <div class="input-group mb-1">
               <div class="input-group mb-1">
               <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">Deur Relay</label>
               </div>
               <select class="custom-select" id="inputGroupSelect01">
                  <!--TODO zet hier nog effectieve opties-->
                  <option selected>Kies...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
               </select>
               </div>
            </div>
         </form>
   </div>
   </div>
   </div>
</template>

<style scoped>
.deurdetail{
   display: grid;
   grid-template-columns: 33% 33% 33%;
   text-align: left;
   row-gap: 20%;
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
   width: 100%;
   height: 100%;
   border-radius: .35rem;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
   grid-area: lastusers;
}

.opentimegroup{
   background-color: #fff;
   width: 100%;
   height: 100%;
   border-radius: .35rem;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
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
}

.options{
   background-color: #fff;
   width: 100%;
   height: 100%;
   border-radius: .35rem;
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;
   box-shadow: 0 .15rem 1.75rem 0 rgba(58, 59, 69, .15);
   grid-area: options;
}

select{
   border-radius:.35rem;
   margin-left: 1em;
}

.statusbuttons{
   display:flex;
   justify-content: space-between;
}
</style>