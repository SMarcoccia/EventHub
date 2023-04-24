import Axios from "./callerService";

import { formatDateService } from "./formatDateService";

const deleteEvent=(id)=>{
    return Axios.delete("events/"+id)
}

// Editer/créer un événement.
const editCreateEvent=(data, config)=>{
    return Axios.post("events", data, config);
}

// Récupère un événement par son id.
const getEvent=(id)=>{
    return Axios.get("events/"+id);
}

// Récupère les événements de l'utilisateur par type et/ou par recherche.
const getAllEventsByUser= async (userId, numPage, type, search)=>{
    const {data}=await Axios.get("events/list/"+userId+"?page="+numPage+"&type="+type+"&search="+search);
    data.content=data.events.content.map((event)=>{
        event.date_event=formatDateService.dateConvertFr(event.date_event)
        return event;
    })
    return data;
}

// Récupère les événements de l'utilisateur par type et/ou par recherche.
const getAllEvents=(userId, numPage, type, search)=>{
    return Axios.get("events/list/"+userId+"?page="+numPage+"&type="+type+"&search="+search);
}

export const eventService={
    deleteEvent, editCreateEvent, getEvent, getAllEventsByUser, getAllEvents
}