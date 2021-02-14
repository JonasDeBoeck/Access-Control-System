let databaseurl = "http://localhost:9090/api";
import axios from 'axios'

async function insertWidget(widget){
    const result = await axios.post(`${databaseurl}/create`,widget)
    return result.data;
}

async function getAllWidgets(){
    const response = await axios.get(`${databaseurl}/widgets`)
    return response.data;
}

async function getWidget(id){
    const response = await axios.get(`${databaseurl}/widgets/${id}`)
    return response.data;
}

async function removeWidget(id){
    const response = await axios.delete(`${databaseurl}/delete/${id}`)
    return response
}

async function updateWidget(widget){
    const response = await axios.put(`${databaseurl}/update/${widget.id}`,widget)
    return response
}

export default {
    insertWidget,
    getAllWidgets,
    removeWidget,
    getWidget,
    updateWidget
}