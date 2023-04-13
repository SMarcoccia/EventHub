import React from 'react'
import { useNavigate } from 'react-router-dom'

export const EventCard = ({event}) => {
    let nbCc=52;
    let titre=event.titre;
    if (titre.length > nbCc) {
        titre = titre.slice(0, nbCc)
        titre = titre+" ...";
    }
    
    const navigate = useNavigate()
    localStorage.setItem("path", window.location.pathname);

    const goToEvent=()=>{
        navigate("/events/"+event.id);
    }
    
    return (
    <div
        className="w-64 h-96 m-auto mb-10 bg-transparent overflow-hidden shadow-md shadow-black group cursor-pointer transition duration-200 ease-in transform z-1 sm:hover:scale-105 bg-gradient-to-r from-blue-300 to-blue-400 dark:border-gray-700">
    <img
        onClick={goToEvent}
        className="w-full h-48 object-cover"
        src={`data:image/jpeg;base64,${event.img}`}
        alt={event.description} />
    <div className="px-6 py-4">
        <div
            onClick={goToEvent}
            className=" h-20 font-bold text-xl mb-2 transition-all duration-100 ease-in-out group-hover:text-pink-700">
            {titre}
        </div>
    </div>
    <div className="px-6 py-0 flex items-center justify-between">
        <p className="text-2xl">{event.date_event.slice(0, 11)}</p>
    </div>
    <div className="px-6 py-0 flex items-center justify-between">
        <p className="text-2xl">{event.prix}$</p>
    </div>
    </div>
    )
}

