import Axios from "./callerService";

import { formatDateService } from "./formatDateService";


const deleteEvent=(id)=>{
    return Axios.delete("api/events/"+id)
}

// Editer/créer un événement.
const editCreateEvent=(data, config)=>{
    return Axios.post("api/events", data, config);
}

// Récupère un événement par son id.
const getEvent=(id)=>{
    return Axios.get("api/events/"+id);
}

// Récupérer tout les événements de l'utilisateur ou tout les événement par type et/ou par recherche.
const getAllEventsByUser= async (username, numPage, type, search)=>{
    const {data}=await Axios.get("api/events/list/"+username+"?page="+numPage+"&type="+type+"&search="+search);
    if (data.success == null) {
        data.content=formatDateService.convertAllDatesFr(data.events.content, "date_event");
    }
    return data;
}

// Récupère tout les événements.
const getAllEvents=(username, numPage, type, search)=>{
    return Axios.get("api/events/list/"+username+"?page="+numPage+"&type="+type+"&search="+search);
}

export const eventService={
    deleteEvent, editCreateEvent, getEvent, getAllEventsByUser, getAllEvents
}