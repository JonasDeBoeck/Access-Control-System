let databaseurl = "http://localhost:9090/api";
import axios from 'axios'

function insertWidget(widget){
    console.log(widget)
    axios.post(`${databaseurl}/create`,widget)
}

export default {
    insertWidget
}