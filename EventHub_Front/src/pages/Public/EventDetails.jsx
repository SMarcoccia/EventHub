import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BackButton } from '@components/BackButton'
import { Loading } from '@components/Loading'

const EventDetails = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const params = useParams()
 



    const fetchEvents = async () => {
        setLoading(true)
        await axios
        .get("http://localhost:8081/api/events")
        .then((res) => { setEvents(res.data)})
        .catch((e) => console.log(e))
        .finally(() => { setLoading(false)})
    }

    // Cherche l'event qui a dans son URL un slug identique.
    const currentEvent = events.find(
        (p) => {
            if(p.titre.replaceAll(/[` .!?`]/gi, '-').toLowerCase()+p.id === params.slug){
                return p;
            }
        }
    )
    
    useEffect(() => {
     fetchEvents()
    }, [])

  return (
    <main className='container mx-auto'>
            {
                currentEvent && !loading ?
                    <>
                        <div className='py-4'>
                            <BackButton path={ user !== null ? "/user/liste-evenements-utilisateur" : window.localStorage.getItem("path")}/>
                        </div>

                        <div className="flex">
                            <div className="w-1/2">
                            
                                <img src={`data:image/jpeg;base64,${currentEvent.img}`} alt={currentEvent.titre} />
                            </div>
                            <div className="w-1/2 pl-10 flex flex-col justify-between">
                                <div>
                                <h2 className="text-5xl font-bold mb-5">{currentEvent.titre}</h2>
                                <div className="mb-3">
                                <p className="mb-3 font-bold text-xl">lieu: </p>
                                    <p>{currentEvent.lieu}</p>
                                </div>
                                <div className="mb-3">
                                    <p className="mb-3 font-bold text-xl">Description: </p>
                                    <p>{currentEvent.description}</p>
                                </div>
                                <div className="mb-3">
                                    <p className="mb-3 font-bold text-xl">Resumé: </p>
                                    <p>{currentEvent.resume}</p>
                                </div>

                                <div className="mb-3">
                                    <p className="mb-3 font-bold text-xl">Catégorie: </p>
                                    <p>{currentEvent.type}</p>
                                </div>

                                </div>
                                
                         
                                <div className='flex justify-between'>
                                    <p className="text-6xl font-bold">{currentEvent.prix} <span className='text-pink-700'>$</span></p>
                                    <button
    
                                        className='py-2 px-6 bg-pink-700 text-pink-50 shadow-sm shadow-black hover:bg-pink-300 hover:text-gray-900'
                                    >+</button>
                                </div>

                            </div>
                        </div>

                    </> :
                    <div className='flex justify-center'>
                        <Loading />
                    </div>
            }

        </main>

  )
}

export default EventDetails;