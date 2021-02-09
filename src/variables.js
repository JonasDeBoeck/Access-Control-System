import axios from 'axios'
import https from 'https'

function login(username, password, callback){
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
    .then(result => callback(result.headers['bs-session-id']))
}

export default login