let databaseurl = "http://localhost:9090/api";
import axios from 'axios'

function insertWidget(widget){
    axios.post(`${databaseurl}/create`,widget)
}

async function getAllWidgets(){
    const response = await axios.get(`${databaseurl}/widgets`)
    return response.data;
}

export default {
    insertWidget,
    getAllWidgets
}