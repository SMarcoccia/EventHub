import Axios from "./callerService";

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
const getAllEventsByUser=(userId, numPage, type, search)=>{
    return Axios.get("events/list/"+userId+"?page="+numPage+"&type="+type+"&search="+search);
}

// Récupère les événements de l'utilisateur par type et/ou par recherche.
const getAllEvents=(userId, numPage, type, search)=>{
    return Axios.get("events/list/"+userId+"?page="+numPage+"&type="+type+"&search="+search);
}

export const eventService={
    deleteEvent, editCreateEvent, getEvent, getAllEventsByUser, getAllEvents
}