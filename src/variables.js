import axios from 'axios'
import https from 'https'

let hostname = window.location.host;

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
    const response = await axios.get(`http://${hostname}/api/doors`,headers)
    return response.data
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
    const response = await axios.post(`http://${hostname}/api/doors/status`, JSON.stringify(data), headers)
    return response.data
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
    console.log(door_id)
    const response = await axios.post(`http://${hostname}/api/doors/open`, data, headers);
    console.log(response);
    return response.data;
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
    const response = await axios.post(`http://${hostname}/api/doors/open`, data, headers);
    console.log(response);
    return response.data;
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
    const response = await axios.post(`http://${hostname}/api/doors/lock`, data, headers);
    const res = await axios.post(`http://${hostname}/api/doors/release`, data, headers);
    console.log(response);
    console.log(res)
    return response.data;
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
    const response = await axios.post(`http://${hostname}/api/doors/lock`, data, headers);
    const res = await axios.post(`http://${hostname}/api/doors/release`, data, headers);
    console.log(response);
    console.log(res)
    return response.data;
}

async function getDoorDetail(door_id, session){
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }
    const response = await axios.get(`http://${hostname}/api/doors/${door_id}`, headers)
    const result = response.data
    return result
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
    await axios.put(`http://${hostname}/api/doors/`+door_id, data, headers)
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
}

async function findAccessGroupNamesForAccessLevel(access_level_id_array, session){
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }
    let access_group_name_array = []
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
    await axios.put(`http://${hostname}/api/doors/`+door_id, data, headers)
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
    updateDoorNameAndDesc
}