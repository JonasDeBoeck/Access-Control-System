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
      <ul>
         <li>[time] - [user1]</li>
         <li>[time] - [user2]</li>
         <li>[time] - [user3]</li>
         <li>[time] - [user4]</li>
         <li>[time] - [user5]</li>
      </ul>
   </div>
   </div>
   </div>
</template>

<style scoped>
.deurdetail{
   display: grid;
   grid-template-columns: 33% 33% 33%;
   text-align: left;
}

.lastusers{
   padding: 1em;
   background-color: #EEEE;
   border-radius:.35rem;
   margin: 2em;
}

.opentimegroup{
   padding: 1em;
   background-color: #EEEE;
   border-radius:.35rem;
   margin: 2em;
}

.information{
   padding: 1em;
   background-color: #EEEE;
   border-radius:.35rem;
   margin: 2em;
}

.status{
   padding: 1em;
   background-color: #EEEE;
   border-radius:.35rem;
   margin: 2em;
   display: flex;
   flex-direction: column;
   align-content: flex-end;
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