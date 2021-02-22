import axios from 'axios'
import https from 'https'
import Vue from 'vue'
// import app from './App.vue'
import router from './router'
// import session from 'vue-session'

let hostname = window.location.host;
const session = Vue.prototype.$session;

async function login(username, password){
    let data = {
        "User": {
            "login_id": username,
            "password": password
        }
    }
    
    const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
    })
    
    let config ={
    headers: {
        "Content-Type": "application/json"
    }
    }
    const response = await instance.post(`http://${hostname}/api/login`, JSON.stringify(data), config)
    return response.headers["bs-session-id"]
}

async function getDoors(session){
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }
    try{
        const response = await axios.get(`http://${hostname}/api/doors`,headers)
        return response.data
    }catch(error){
        console.log(error.response)
        errorHandling(error)
        return {DoorCollection: {rows: []}}
    }  
}

async function getDoorsStatus(session){
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }

    let data = {
        "monitoring_permission": true
    }
    try{
        const response = await axios.post(`http://${hostname}/api/doors/status`, JSON.stringify(data), headers)
        return response.data
    }catch(error){
        console.log(error.response)
        errorHandling(error)
        return {DoorStatusCollection: {rows: []}}
    }
    
}

async function getDoorsForOverview(session){
    const doorsStatus = await getDoorsStatus(session)
    const doors = await getDoors(session)
    const rowsDoors = doors['DoorCollection']['rows']
    const rowsDoorsStatus = doorsStatus['DoorStatusCollection']['rows']
    const result = []
    rowsDoors.forEach(row => result.push({
        id : parseInt(row.id),
        name : row.name
    }))
    const statusResult = []
    rowsDoorsStatus.forEach(row => statusResult.push({
        id : parseInt(row.door_id.id),
        unlocked : row.unlocked === "true",
        nietdicht: row.opened === "true"
    }))
    for(let i=0; i < result.length; i++){
        let door = result[i]
        for(let j=0; j < statusResult.length; j++){
            let status = statusResult[j]
            if(door.id === status.id){
                door.unlocked = status.unlocked
            }
        }
    }
    return result
}

async function unlockDoor(door_id, session) {
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }

    let data = {
        DoorCollection: {
        total: 1,
        rows: [
            {
                id: door_id
            }
            ]
        }
      }
    try{
        console.log(door_id)
        const response = await axios.post(`http://${hostname}/api/doors/open`, data, headers);
        console.log(response);
        return response.data;
    }catch(error){
        console.log(error.response)
        errorHandling(error)
        return {error: "unauthorized"}
    } 
}

async function unlockDoors(doorids,session){
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }

    let rows_array = []
    doorids.forEach(doorid => rows_array.push({id: doorid}))

    let data = {
        DoorCollection: {
          total: doorids.length,
          rows: rows_array
        }
      }
    try{
        const response = await axios.post(`http://${hostname}/api/doors/open`, data, headers);
        console.log(response);
        return response.data;
    }catch(error){
        console.log(error.response)
        errorHandling(error)
        return {error: "unauthorized"}
    }
}

async function lockDoors(door_ids, session) {

    let headers = {
        headers: {
            "bs-session-id": session
        }
    }

    let rows_array = []
    door_ids.forEach(doorid => rows_array.push({id: doorid}))

    let data = {
        "DoorCollection": {
        "total": door_ids.length,
        "rows": rows_array
        }
    }
    try{
        const response = await axios.post(`http://${hostname}/api/doors/lock`, data, headers);
        const res = await axios.post(`http://${hostname}/api/doors/release`, data, headers);
        console.log(response);
        console.log(res)
        return response.data;
    }catch(error){
        console.log(error.response)
        errorHandling(error)
        return {error: "unauthorized"}
    }
}

async function lockDoor(door_id, session) {
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }

    let data = {
        "DoorCollection": {
        "total": 1,
        "rows": [
        {
            "id": door_id
        }
        ]
        }
    }
    try{
        const response = await axios.post(`http://${hostname}/api/doors/lock`, data, headers);
        const res = await axios.post(`http://${hostname}/api/doors/release`, data, headers);
        console.log(response);
        console.log(res)
        return response.data;
    }catch(error){
        console.log(error.response)
        errorHandling(error)
        return {error: "unauthorized"}
    }
    
}

async function getDoorDetail(door_id, session){
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }
    try{
        const response = await axios.get(`http://${hostname}/api/doors/${door_id}`, headers)
        const result = response.data
        return result
    }catch(error){
        console.log(error.response)
        errorHandling(error)
        return {error: "unauthorized"}
    }
    
}

async function getDoorDetailStatus(door_id, session){
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }
    let data = {
        "monitoring_permission": true
    }
    try{
        const response = await axios.post(`http://${hostname}/api/doors/status`, JSON.stringify(data), headers)
        const result = response.data
        const rowsStatus = result.DoorStatusCollection.rows
        let unlocked = "false"
        for(let i=0; i < rowsStatus.length; i++){
            if(rowsStatus[i].door_id.id === door_id){
                unlocked = rowsStatus[i].unlocked
            }
        }
        if(unlocked === "false"){
            unlocked = false
        }
        else{
            unlocked = true
        }
        return unlocked
    }catch(error){
        console.log(error.response)
        errorHandling(error)
        return {error: "unauthorized"}
    }
}

async function updateDoorOpen_Duration(door_id, newDuration, session){
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }
    let data = {
        "Door": {
            "open_duration": newDuration
        }
    }
    try{
        await axios.put(`http://${hostname}/api/doors/`+door_id, data, headers)
    }catch(error){
        console.log(error.response)
        errorHandling(error)
        return {error: "unauthorized"}
    }
}

async function getAccessLevelForDoor(door_id, session){
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }
    let access_level_array = []
    let access_level_id_array = []
    let access_level_name_array = []
    try{
        let requestResult = await axios.get(`http://${hostname}/api/access_levels`, headers)
        let rows = requestResult.data.AccessLevelCollection.rows
        for(let i = 0; i< rows.length; i++){
            let access_level = rows[i]
            let access_level_items = access_level.access_level_items
            if(typeof(access_level_items) !== 'undefined' && access_level_items !== null){
                for(let k=0; k< access_level_items.length; k++){
                    let doors = access_level_items[k].doors
                    if(typeof(doors) !== 'undefined' && doors !== null){                
                        for(let j=0; j<doors.length;  j++){
                            let door = doors[j]
                            if(door.id == door_id){
                                access_level_id_array.push(access_level.id)
                                access_level_name_array.push({
                                    id: access_level.id,
                                    name: access_level.name
                                })
                            }
                        }
                    }
                }
            }
        }
        access_level_array.push(access_level_id_array)
        access_level_array.push(access_level_name_array)
        return access_level_array
    }catch(error){
        console.log(error.response)
        errorHandling(error)
        return {error: "unauthorized"}
    }
}

async function findAccessGroupNamesForAccessLevel(access_level_id_array, session){
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }
    let access_group_name_array = []
    try{
        let requestResult = await axios.get(`http://${hostname}/api/access_groups`, headers)
        let access_groups = requestResult.data.AccessGroupCollection.rows
        for(let i=0; i<access_groups.length; i++){
            let access_group = access_groups[i]
            let access_levels = access_group.access_levels
            if(typeof(access_levels) !== 'undefined' || access_levels !== null){
                for(let j=0; j<access_levels.length; j++){
                    let access_level = access_levels[j]
                    for(let l=0; l < access_level_id_array.length; l++){
                        if(access_level.id === access_level_id_array[l]){
                            access_group_name_array.push({
                                id : access_group.id,
                                name : access_group.name
                            })
                        }
                    }
                }
            }
        }
        return access_group_name_array
    }catch(error){
        console.log(error.response)
        errorHandling(error)
        return {error: "unauthorized"}
    }
}

async function getAccesGroupNamesAndLevelsForDoor(door_id, session){
    let access_level_array = await getAccessLevelForDoor(door_id, session)
    let access_level_id_array = access_level_array[0]
    let access_level_name_array = access_level_array[1]
    let result_array = []
    let access_group_name_array = await findAccessGroupNamesForAccessLevel(access_level_id_array, session)
    result_array.push(access_group_name_array)
    result_array.push(access_level_name_array)
    return result_array
}

async function updateDoorNameAndDesc(door_id, name, description, session){
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }
    let data = {
        "Door": {
            "name": name,
            "description": description
        }
    }
    try{
        await axios.put(`http://${hostname}/api/doors/`+door_id, data, headers)
    }catch(error){
        console.log(error.response)
        errorHandling(error)
        return {error: "unauthorized"}
    }
}

async function getDoorGroups(session) {
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }
    try{
        let response = await axios.get(`http://${hostname}/api/door_groups`, headers)
        let data = response.data['DoorGroupCollection']['rows']
        let result = []
        data.forEach(el => {
            result.push({"id": el.id, "name": el.name, "description": el.description, "doors": el.doors});
        })
        result[0].doors = await getDoorsForOverview(session)
        console.log(result)
        return result
    }catch(error){
        console.log(error.response)
        errorHandling(error)
        return {error: "unauthorized"}
    }
}   

// async function getAllAccesGroups(session){
//     let headers = {
//         headers: {
//             "bs-session-id": session
//         }
//     }
//     const result = await axios.get("http://localhost:8080/api/access_groups", headers)
//     console.log(result.data.AccessGroupCollection.rows)
//     let arrayResult = []
//     for(let i=0; i < arrayResult.length; i++){
//         arrayResult.push({
//             id: result[i].id,
//             name: result[i].name
//         })
//     }
//     return arrayResult
// }

function errorHandling(error){
    if (error.response.status === 401){
        // console.log(vuesession)
        console.log(session.getAll())
        session.remove("bs-session-id")
        console.log(session.getAll())
        router.push("/")
    }
}

export default {
    login,
    getDoors,
    getDoorsStatus,
    getDoorsForOverview,
    unlockDoor,
    lockDoor,
    getDoorDetail,
    getDoorDetailStatus,
    unlockDoors,
    lockDoors,
    updateDoorOpen_Duration,
    getAccesGroupNamesAndLevelsForDoor,
    updateDoorNameAndDesc,
    getDoorGroups
}