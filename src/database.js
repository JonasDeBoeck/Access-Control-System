let databaseurl = "http://localhost:9090";
import axios from 'axios'

async function insertWidget(widget){
    const result = await axios.post(`${databaseurl}/api/create`,widget)
    return result.data;
}

async function getAllWidgets(){
    const response = await axios.get(`${databaseurl}/api/widgets`)
    return response.data;
}

async function getWidget(id){
    const response = await axios.get(`${databaseurl}/api/widgets/${id}`)
    return response.data;
}

async function removeWidget(id){
    const response = await axios.delete(`${databaseurl}/api/delete/${id}`)
    return response
}

async function updateWidget(widget){
    const response = await axios.put(`${databaseurl}/api/update/${widget.id}`,widget)
    return response
}

function insertEvent(event){
    axios.post(`${databaseurl}/biostar/create/event`, event)
}

export default {
    insertWidget,
    getAllWidgets,
    removeWidget,
    getWidget,
    updateWidget,
    insertEvent
}