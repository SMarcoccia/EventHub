import React from 'react'
import { useNavigate } from 'react-router-dom'

export const EventCard = ({event}) => {
    const navigate = useNavigate()
    localStorage.setItem("path", window.location.pathname);
    const goToEvent = () => {
        navigate("/events/" + event.titre.replaceAll(/[` .!?`]/gi, '-').toLowerCase()+event.id)
    } 
    
    return (
        <div
        className="w-64 h-75 bg-transparent overflow-hidden shadow-md shadow-black group cursor-pointer transition duration-200 ease-in transform z-1 sm:hover:scale-105 bg-gradient-to-r from-blue-300 to-blue-400 dark:border-gray-700">
    <img
        onClick={goToEvent}
        className="w-full h-48 object-cover"
        src={`data:image/jpeg;base64,${event.img}`}
        alt={event.description} />
    <div
        className="px-6 py-4">
        <div
            onClick={goToEvent}
            className="font-bold text-xl mb-2 transition-all duration-100 ease-in-out group-hover:text-pink-700">{event.titre}</div>
    </div>
    <div className="px-6 py-4 flex items-center justify-between">
    <p className="text-2xl">{event.prix}$</p>
        <button
        className="bg-pink-50 text-pink-700 shadow-sm shadow-black hover:bg-pink-300 hover:text-gray-900 font-bold py-2 px-4">
            +
        </button>
    </div>
    </div>
    )
}

