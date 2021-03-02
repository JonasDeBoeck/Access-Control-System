import axios from 'axios'
import https from 'https'
import Vue from 'vue'
// import app from './App.vue'
import router from './router'
// import session from 'vue-session'

// let hostname = window.location.host;
//let hostname = process.env.VUE_BIOSTAR_API_URL
let hostname = "http://localhost:9090"
let biostarURL = "https://localhost:500"
const session = Vue.prototype.$session;


/**
 * @brief Logs the user in on the biostar API
 * 
 * @param {string} username 
 * @param {string} password 
 * 
 * @returns the session-id found in the API respons
 */
async function login(username, password) {
    console.log(hostname)
    let data = {
        "User": {
            "login_id": username,
            "password": password
        }
    }

    try{
        const response = await axios.post(`${hostname}/api/login`, JSON.stringify(data))
        return response.data
    }catch(err)
    {
        return false
    }
}




/** 
 * @brief sends a get request to the biostar api to get ALL DOORS
 * 
 * @param {string} session 
 * 
 * @returns {JSON} All doors in json format
 */
async function getDoors(session) {
    let forward = {
        method: "get",
        apiKey: session,
        url: `${biostarURL}/api/doors`,
        body: ""
    }
    try {
        const response = await axios.post(`${hostname}/api/forward`,forward)
        return response.data
    } catch (error) {
        console.log(error.response)
        errorHandling(error)
        return { DoorCollection: { rows: [] } }
    }
}




/**
 * @brief sends a post request to the Biostar API to obtain all doors stausses
 * 
 * @param {string} session 
 * 
 * @returns the data found in the response of the API
 */
async function getDoorsStatus(session) {
    let data = {
        "monitoring_permission": true
    }

    let forward = {
        method: "post",
        apiKey: session,
        url: `${biostarURL}/api/doors/status`,
        body: JSON.stringify(data)
    }
    try {
        const response = await axios.post(`${hostname}/api/forward`, forward)
        return response.data
    } catch (error) {
        // console.log(error.response.data.DeviceResponse.result)
        errorHandling(error)
        return { DoorStatusCollection: { rows: [] } }
    }

}



/**
 * @brief filters out the needed information out of the API responses
 *        to show on the Overview page
 * 
 * @calls getDoorSatus , getDoors 
 * 
 * @param {string} session 
 * 
 * @returns an array of Doors with the filtered information
 */
async function getDoorsForOverview(session) {
    const doorsStatus = await getDoorsStatus(session)
    const doors = await getDoors(session)
    const rowsDoors = doors['DoorCollection']['rows']
    const rowsDoorsStatus = doorsStatus['DoorStatusCollection']['rows']
    const result = []
    rowsDoors.forEach(row => result.push({
        id: parseInt(row.id),
        name: row.name
    }))
    const statusResult = []
    rowsDoorsStatus.forEach(row => statusResult.push({
        id: parseInt(row.door_id.id),
        unlocked: row.unlocked === "true",
        nietdicht: row.opened === "true"
    }))
    for (let i = 0; i < result.length; i++) {
        let door = result[i]
        for (let j = 0; j < statusResult.length; j++) {
            let status = statusResult[j]
            if (door.id === status.id) {
                door.unlocked = status.unlocked
            }
        }
    }
    return result
}




/**
 * @brief sends an unlock door request to the biostar API to unlock 1 door
 * 
 * @param {number} door_id 
 * @param {string} session 
 * 
 * @returns a success or failure message from the API response
 */
async function unlockDoor(door_id, session) {
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

    let forward = {
        method: "post",
        apiKey: session,
        url: `${biostarURL}/api/doors/open`,
        body: JSON.stringify(data)
    }
    
    try {
        console.log(door_id)
        const response = await axios.post(`${hostname}/api/forward`, forward);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error.response)
        errorHandling(error)
        return { error: "unauthorized" }
    }
}



/**
 * @brief sends an unlock door request to the biostar API to unlock MULTIPLE doors
 * 
 * @param {number} doorids 
 * @param {string} session 
 * 
 * @returns a success or failure message from the API response
 */
async function unlockDoors(doorids, session) {
    let rows_array = []
    doorids.forEach(doorid => rows_array.push({ id: doorid }))

    let data = {
        DoorCollection: {
            total: doorids.length,
            rows: rows_array
        }
    }

    let forward = {
        method: "post",
        apiKey: session,
        url: `${biostarURL}/api/doors/open`,
        body: JSON.stringify(data)
    }

    try {
        const response = await axios.post(`${hostname}/api/forward`, forward);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error.response)
        errorHandling(error)
        return { error: "unauthorized" }
    }
}



/**
 * @brief sends an lock door request to the biostar API to lock MULTIPLE doors
 * 
 * @param {number} door_ids 
 * @param {string} session 
 * 
 * @returns a success or failure message from the API response
 */
async function lockDoors(door_ids, session) {
    let rows_array = []
    door_ids.forEach(doorid => rows_array.push({ id: doorid }))

    let data = {
        "DoorCollection": {
            "total": door_ids.length,
            "rows": rows_array
        }
    }

    let forward = {
        method: "post",
        apiKey: session,
        url: `${biostarURL}/api/doors/lock`,
        body: JSON.stringify(data)
    }
    let forward2 = {
        method: "post",
        apiKey: session,
        url: `${biostarURL}/api/doors/release`,
        body: JSON.stringify(data)
    }


    try {
        const response = await axios.post(`${hostname}/api/forward`, forward);
        const res = await axios.post(`${hostname}/api/forward`, forward2);
        console.log(response);
        console.log(res)
        return response.data;
    } catch (error) {
        console.log(error.response)
        errorHandling(error)
        return { error: "unauthorized" }
    }
}



/**
 * @brief sends an lock door request to the biostar API to lock 1 door
 * 
 * @param {number} door_id 
 * @param {string} session 
 * 
 * @returns a success or failure message from the API response
 */
async function lockDoor(door_id, session) {
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

    let forward = {
        method: "post",
        apiKey: session,
        url: `${biostarURL}/api/doors/lock`,
        body: JSON.stringify(data)
    }

    let forward2 = {
        method: "post",
        apiKey: session,
        url: `${biostarURL}/api/doors/release`,
        body: JSON.stringify(data)
    }

    try {
        const response = await axios.post(`${hostname}/api/forward`, forward);
        const res = await axios.post(`${hostname}/api/forward`, forward2);
        console.log(response);
        console.log(res)
        return response.data;
    } catch (error) {
        console.log(error.response)
        errorHandling(error)
        return { error: "unauthorized" }
    }

}



/**
 * @brief sends a get request to get details on a specific door
 * 
 * @param {number} door_id 
 * @param {string} session 
 * 
 * @returns the door detail data found in the response of the API
 */
async function getDoorDetail(door_id, session) {
    let forward = {
        method: "get",
        apiKey: session,
        url: `${biostarURL}/api/doors/${door_id}`,
        body: ""
    }

    try {
        const response = await axios.post(`${hostname}/api/forward`,forward)
        const result = response.data
        return result
    } catch (error) {
        console.log(error.response)
        errorHandling(error)
        return { error: "unauthorized" }
    }

}


/**
 * @brief gets all door statusses to then filter only the status from the needed door (false or true)
 * 
 * @param {number} door_id 
 * @param {string} session 
 * 
 * @returns {boolean}
 */
async function getDoorDetailStatus(door_id, session) {
    try {
        const result = await getDoorsStatus(session)
        const rowsStatus = result.DoorStatusCollection.rows
        let unlocked = "false"
        for (let i = 0; i < rowsStatus.length; i++) {
            if (rowsStatus[i].door_id.id === door_id) {
                unlocked = rowsStatus[i].unlocked
            }
        }
        if (unlocked === "false") {
            unlocked = false
        }
        else {
            unlocked = true
        }
        return unlocked
    } catch (error) {
        console.log(error.response)
        errorHandling(error)
        return { error: "unauthorized" }
    }
}

/**
 * @brief sends a request to the api to change the set duration of a door
 * 
 * @param {number} door_id 
 * @param {number} newDuration 
 * @param {string} session 
 * 
 */
async function updateDoorOpen_Duration(door_id, newDuration, session) {
    let data = {
        "Door": {
            "open_duration": newDuration
        }
    }

    let forward = {
        method: "put",
        apiKey: session,
        url: `${biostarURL}/api/doors/${door_id}`,
        body: JSON.stringify(data)
    }
    
    try {
        await axios.post(`${hostname}/api/forward`, forward)
    } catch (error) {
        console.log(error.response)
        errorHandling(error)
        return { error: "unauthorized" }
    }
}



/**
 * @brief sends a get request to get the different access levels with their doors
 *        and filters out 1 specific door and its access group
 * 
 * @param {number} door_id 
 * @param {string} session 
 * 
 * @return {[]} an array with the access levels of which the door is part of
 */
async function getAccessLevelForDoor(door_id, session) {
    let forward = {
        method: "get",
        apiKey: session,
        url: `${biostarURL}/api/access_levels`,
        body: ""
    }

    let access_level_array = []
    let access_level_id_array = []
    let access_level_name_array = []
    try {
        let requestResult = await axios.post(`${hostname}/api/forward`,forward)
        let rows = requestResult.data.AccessLevelCollection.rows
        for (let i = 0; i < rows.length; i++) {
            let access_level = rows[i]
            let access_level_items = access_level.access_level_items
            if (typeof (access_level_items) !== 'undefined' && access_level_items !== null) {
                for (let k = 0; k < access_level_items.length; k++) {
                    let doors = access_level_items[k].doors
                    if (typeof (doors) !== 'undefined' && doors !== null) {
                        for (let j = 0; j < doors.length; j++) {
                            let door = doors[j]
                            if (door.id == door_id) {
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
    } catch (error) {
        console.log(error.response)
        errorHandling(error)
        return { error: "unauthorized" }
    }
}



/**
 * @brief gets the different group names within a certain access level
 * 
 * @param {number} access_level_id_array 
 * @param {string} session 
 * 
 * @returns {[]} an array of group names
 */
async function findAccessGroupNamesForAccessLevel(access_level_id_array, session) {
    
    let forward = {
        method: "get",
        apiKey: session,
        url: `${biostarURL}/api/access_groups`,
        body: ""
    }
    
    let access_group_name_array = []
    try {
        let requestResult = await axios.post(`${hostname}/api/forward`,forward)
        let access_groups = requestResult.data.AccessGroupCollection.rows
        for (let i = 0; i < access_groups.length; i++) {
            let access_group = access_groups[i]
            let access_levels = access_group.access_levels
            if (typeof (access_levels) !== 'undefined' || access_levels !== null) {
                for (let j = 0; j < access_levels.length; j++) {
                    let access_level = access_levels[j]
                    for (let l = 0; l < access_level_id_array.length; l++) {
                        if (access_level.id === access_level_id_array[l]) {
                            access_group_name_array.push({
                                id: access_group.id,
                                name: access_group.name
                            })
                        }
                    }
                }
            }
        }
        return access_group_name_array
    } catch (error) {
        console.log(error.response)
        errorHandling(error)
        return { error: "unauthorized" }
    }
}



/**
 * @brief gets both group names and access levels for a certain door.
 * 
 * @calls getAccesGroupNamesForAccessLevel, getAccessLevelForDoor
 * 
 * @param {number} door_id 
 * @param {string} session 
 * 
 * @returns {[]} an array with both the group names and access levels for a door
 */
async function getAccesGroupNamesAndLevelsForDoor(door_id, session) {
    let access_level_array = await getAccessLevelForDoor(door_id, session)
    let access_level_id_array = access_level_array[0]
    let access_level_name_array = access_level_array[1]
    let result_array = []
    let access_group_name_array = await findAccessGroupNamesForAccessLevel(access_level_id_array, session)
    result_array.push(access_group_name_array)
    result_array.push(access_level_name_array)
    return result_array
}



/**
 * @brief sends a request to change a doors' name and description  
 * 
 * @param {number} door_id 
 * @param {string} name 
 * @param {string} description 
 * @param {string} session 
 * 
 *
 */
async function updateDoorNameAndDesc(door_id, name, description, session) {
    let data = {
        "Door": {
            "name": name,
            "description": description
        }
    }

    let forward = {
        method: "put",
        apiKey: session,
        url: `${biostarURL}/api/doors/${door_id}`,
        body: JSON.stringify(data)
    }

    try {
        await axios.post(`${hostname}/api/forward`, forward)
    } catch (error) {
        console.log(error.response)
        errorHandling(error)
        return { error: "unauthorized" }
    }
}



/**
 * @brief gets all door groups
 * 
 * @param {string} session 
 * 
 * @returns {[]} an array with all door groups and its id, description, name and doors
 */
async function getDoorGroups(session) {
    let forward = {
        method: "get",
        apiKey: session,
        url: `${biostarURL}/api/door_groups`,
        body: ""
    }

    try {
        let response = await axios.post(`${hostname}/api/forward`,forward)
        let data = response.data['DoorGroupCollection']['rows']
        let result = []
        data.forEach(el => {
            result.push({ "id": el.id, "name": el.name, "description": el.description, "doors": el.doors });
        })
        result[0].doors = await getDoorsForOverview(session)
        console.log(result)
        return result
    } catch (error) {
        console.log(error.response)
        errorHandling(error)
        return { error: "unauthorized" }
    }
}

// async function getAllAccesGroups(session){
//     let headers = {
//         headers: {
//             "bs-session-id": session
//         }
//     }
//     const result = await axios.get("localhost:8080/api/access_groups", headers)
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



/**
 * @brief handles a 401 error by sending you back to the login page
 * 
 * @param {error} error 
 */
function errorHandling(error) {
    if (error.response.status === 401) {
        // console.log(vuesession)
        console.log(session.getAll())
        session.remove("bs-session-id")
        console.log(session.getAll())
        router.push("/")
    }
}




/**
 * @brief gets all events for a door according to the params, for a certain time frame, and limit
 *        Filters this data so only the needed information is showed
 * 
 * @calls getEventTypes
 * 
 * @param {string} session 
 * @param {number} limit 
 * @param {string} first_date ISO standard representation of a date 
 * @param {string} second_date ISO standard representation of a date 
 * 
 * @returns {[]} an array with the filtered event data to be showed on the monitoring section on the webpage
 */
async function monitoring(session,limit,first_date,second_date){
    let data = {
        "Query": {
          "limit": limit,
          "conditions": [
            {
              "column": "datetime",
              "operator": 3,
              "values": [
                first_date,
                second_date
                ]
            },
          ],
          "orders": [
            {
              "column": "datetime",
              "descending": true
            }
          ]
        }
    }

    let forward = {
        method: "post",
        apiKey: session,
        url: `${biostarURL}/api/events/search`,
        body: JSON.stringify(data)
    }
    
    const response = await axios.post(`${hostname}/api/forward`,forward)
    const filtered = []
    console.log(response)
    let collection = response.data.EventCollection.rows
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric', second: 'numeric' };
    let i = 1;
    const event_types = await getEventTypes(session)
    for (let event of collection){
        const event_name = event_types.EventTypeCollection.rows.filter(type => type.code === event.event_type_id.code);
        let filter = {
            number: i,
            id: event.id,
            date: new Date(event.datetime).toLocaleDateString("nl-BE",options),
            event_code: event.event_type_id.code,
            event_name: event_name[0].name,
            user: {id: event.user_id.user_id, name: event.user_id.name},
            user_group: event.user_group_id,
            device_id: event.device_id.id
        }
        i++;
        filtered.push(filter)
    }
    return filtered
}




/**
 * @brief gets all the event types stored within the Biostar API
 * 
 * @param {string} session 
 * 
 * @returns the data found in the response of the API, containing all event_types
 */
async function getEventTypes(session){
    let forward = {
        method: "get",
        apiKey: session,
        url: `${biostarURL}/api/event_types?setting_all=true`,
        body: ""
    }

    const response = await axios.post(`${hostname}/api/forward`,forward)
    return response.data
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
    getDoorGroups,
    monitoring,
    getEventTypes
}
