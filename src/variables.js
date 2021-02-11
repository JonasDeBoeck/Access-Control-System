import axios from 'axios'
import https from 'https'

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
    const response = await instance.post("http://localhost:8080/api/login", JSON.stringify(data), config)
    return response.headers["bs-session-id"]
}

async function getDoors(session){
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }
    const response = await axios.get("http://localhost:8080/api/doors",headers)
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
    const response = await axios.post("http://localhost:8080/api/doors/status", JSON.stringify(data), headers)
    return response.data
}

async function getDoorsForOverview(session){
    const doorsStatus = await getDoorsStatus(session)
    const doors = await getDoors(session)
    const rowsDoors = doors['DoorCollection']['rows']
    const rowsDoorsStatus = doorsStatus['DoorStatusCollection']['rows']
    const result = []
    rowsDoors.forEach(row => result.push({
        id : row.id,
        name : row.name
    }))
    const statusResult = []
    rowsDoorsStatus.forEach(row => statusResult.push({
        id : row.door_id.id,
        unlocked : row.unlocked
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
        "DoorCollection": {
          "total": 1,
          "rows": [
            {
              "id": door_id
            }
          ]
        }
    }
    const response = await axios.post("http://localhost:8080/api/door/unlock", JSON.stringify(data), headers);
    console.log(response);
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
    const response = await axios.post("http://localhost:8080/api/door/lock", JSON.stringify(data), headers);
    console.log(response);
    return response.data;
}

async function getDoorDetail(door_id, session){
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }
    const response = await axios.get("http://localhost:8080/api/doors/"+door_id, headers)
    const result = response.data
    return result
}


export default {
    login,
    getDoors,
    getDoorsStatus,
    getDoorsForOverview,
    unlockDoor,
    lockDoor,
    getDoorDetail
}