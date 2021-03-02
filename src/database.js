let databaseurl = process.env.VUE_APP_BACKEND_API_URL;
import axios from 'axios'

async function insertWidget(widget) {
    const result = await axios.post(`${databaseurl}/api/create`, widget)
    return result.data;
}

async function getAllWidgets() {
    const response = await axios.get(`${databaseurl}/api/widgets`)
    return response.data;
}

async function getWidget(id) {
    const response = await axios.get(`${databaseurl}/api/widgets/${id}`)
    return response.data;
}

async function removeWidget(id) {
    const response = await axios.delete(`${databaseurl}/api/delete/${id}`)
    return response
}

async function updateWidget(widget) {
    const response = await axios.put(`${databaseurl}/api/update/${widget.id}`, widget)
    return response
}

async function insertEvent(event) {
    const result = await axios.post(`${databaseurl}/api/create/event`, event)
    return result
}

async function getEvents() {
    const response = await axios.get(`${databaseurl}/api/events/`)
    return response.data
}

async function cancelEvent(event_id) {
    let body = {
        "event_id": event_id
    }
    const result = await axios.post(`${databaseurl}/api/events/cancel`, body)
    return result.data
}

async function getAllWidgetsForOverview() {
    let widgets = await getAllWidgets()
    let events = await getEvents()
    return formatWidgets(widgets, events)
    // if (widgets === undefined){
    //     return []
    // }
    // if (events.length === 0){
    //     for (let widget of widgets){
    //         widget.active = false
    //         widget.event_id = -1
    //         widget.event_duration = widget.duration
    //     }
    //     return widgets
    // }
    // for (let widget of widgets){
    //     widget.active = false
    //     for (let event of events){
    //         if (event.widget !== undefined && widget.id === event.widget.id){
    //             widget.active = true;
    //             widget.event_id = event.id
    //             widget.event_duration = event.duration
    //         }
    //     }
    // }
    // return widgets
}

function formatWidgets(widgets, events) {
    if (widgets === undefined) {
        return []
    }
    if (events.length === 0) {
        for (let widget of widgets) {
            widget.active = false
            widget.event_id = -1
            widget.event_duration = widget.duration
        }
        return widgets
    }
    for (let widget of widgets) {
        widget.active = false
        for (let event of events) {
            if (event.widget !== undefined && widget.id === event.widget.id) {
                widget.active = true;
                widget.event_id = event.id
                widget.event_duration = event.duration
            }
        }
    }
    return widgets;
}

async function top5WidgetsUsed() {
    let widgets = await axios.get(`${databaseurl}/api/widgets/top5used`)
    let events = await getEvents()
    return formatWidgets(widgets.data, events)
}

async function getActiveWidgets() {
    let widgets = await getAllWidgetsForOverview()
    let result = []
    widgets.forEach(widget => {
        if (widget.active === true) {
            result.push(widget)
        }
    });
    return result
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
    getAllWidgetsForOverview,
    top5WidgetsUsed,
    getActiveWidgets
}