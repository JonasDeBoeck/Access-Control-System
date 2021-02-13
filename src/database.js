let databaseurl = "http://localhost:9090/api";
import axios from 'axios'

async function insertWidget(widget){
    const result = await axios.post(`${databaseurl}/create`,widget)
    return result.data;
}

async function getAllWidgets(){
    const response = await axios.get(`${databaseurl}/widgets`)
    console.log(response)
    return response.data;
}

async function removeWidget(id){
    const response = await axios.delete(`${databaseurl}/delete/${id}`).catch(err => console.log(err.response))
    return response
}

export default {
    insertWidget,
    getAllWidgets,
    removeWidget
}