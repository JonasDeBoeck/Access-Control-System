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
    console.log(session)
    const response = await axios.get("http://localhost:8080/api/doors",headers)
    return response
}

export default {
    login,
    getDoors
}