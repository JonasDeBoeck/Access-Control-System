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
<<<<<<< HEAD
    const result = await axios.post(`${databaseurl}/biostar/create/event`, event)
    return result
=======
    axios.post(`${databaseurl}/api/create/event`, event)
>>>>>>> e10798537042ef604e996b8fb4b12421a371774e
}

async function getEvents(){
    const response = await axios.get(`${databaseurl}/api/events/`)
    return response.data
}

function cancelEvent(event){
    let body = {
        event_id: event.id
    }
    axios.post(`${databaseurl}/api/event/cancel`, body)
}

async function getAllWidgetsForOverview(){
    let widgets = await getAllWidgets()
    let events = await getEvents()
    if (widgets === undefined){
        return []
    }
    if (events.length === 0){
        for (let widget of widgets){
            widget.active = false
            widget.event_id = -1
        }
        return widgets
    }
    for (let widget of widgets){
        widget.active = false
        for (let event of events){
            if (event.widget !== undefined && widget.id === event.widget.id){
                widget.active = true;
                widget.event_id = event.id
            }
        }
    }
    return widgets
}

export default {
    insertWidget,
    getAllWidgets,
    removeWidget,
    getWidget,
    updateWidget,
    insertEvent,
    cancelEvent,
    getEvents,
    getAllWidgetsForOverview
}