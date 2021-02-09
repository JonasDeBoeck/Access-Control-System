import axios from 'axios'
import https from 'https'

const login = function(username, password, callback){
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
    
    instance.post("http://localhost:8080/api/login", JSON.stringify(data), config)
    .catch(error => console.log(error.response))
    .then(result => callback(result.headers["bs-session-id"]))
}

const getDoors = function(session){
    let headers = {
        headers: {
            "bs-session-id": session
        }
    }
    console.log(session)
    axios.get("http://localhost:8080/api/doors",headers).then(result => console.log(result))
}

export default {
    login,
    getDoors
}