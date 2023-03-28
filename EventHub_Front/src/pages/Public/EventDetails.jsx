import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BackButton } from '@components/public/BackButton'
import { Loading } from '@components/public/Loading'

const EventDetails = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    const [events, setEvents]=useState({
        content:[],
        totalPages:'',
        totalElements:'',
        pageSize:'',
        lastPage: false,
        pageNumber:''
    }); 
    const [loading, setLoading] = useState(false)
    const params = useParams()

    const fetchEvents = async () => {
        setLoading(true)
        await axios
        .get("http://localhost:8081/api/events?page=1")
        .then((res) => { 
            res.data.content=res.data.content.map((event)=>{
                event.date_event=dateConvertFr(event.date_event)
                return event;
            })
            setEvents(res.data)
        })
        .catch((e) => console.log(e))
        .finally(() => { setLoading(false)})
    }

    const dateConvertFr = (date)=>{
        date=new Date(date);
        date = ('0'+date.getDate()).slice(-2)+"-"+('0'+(date.getMonth()+1)).slice(-2)+"-"+date.getFullYear()+" "+('0'+date.getHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2);
        return date;
    }

    // Cherche l'event qui a dans son URL un slug identique.
    const currentEvent = events.content.find(
        (p) => {
            console.log("params.slug : ", params.slug)
            if(p.titre.replaceAll(/[` .!?`]/gi, '-').toLowerCase()+p.id === params.slug){
                return p;
            }
        }
    )
    
    useEffect(() => {
     fetchEvents()
    }, [])

  return (
    <main >
            {
                currentEvent && !loading ?
                    <div className='mx-7'>
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
                                    <p><span className="mb-3 font-bold text-xl">Lieu : </span>{currentEvent.lieu}</p>
                                </div>
                                <div className="mb-3">
                                    <p><span className="mb-3 font-bold text-xl">Date : </span>{currentEvent.date_event}</p>
                                </div>
                                <div className="mb-3">
                                    <p><span className="mb-3 font-bold text-xl">Resumé : </span>{currentEvent.resume}</p>
                                </div>
                                <div className="mb-3">
                                    <p className="mb-3 font-bold text-xl">Description: </p>
                                    <p>{currentEvent.description}</p>
                                </div>

                                <div className="mb-3">
                                    <p><span className="mb-3 font-bold text-xl">Catégorie : </span>{currentEvent.type}</p>
                                </div>

                                </div>
                                
                         
                                <div className='flex justify-between mt-7'>
                                    <p className="text-6xl font-bold">{currentEvent.prix} <span className='text-pink-700'>$</span></p>
                                    <button
    
                                        className='mr-2 py-2 px-6 bg-pink-700 text-pink-50 shadow-sm shadow-black hover:bg-pink-300 hover:text-gray-900'
                                    >+</button>
                                </div>

                        </div>
                        </div>

                    </div> :
                    <div className='flex justify-center'>
                        <Loading />
                    </div>
            }

        </main>

  )
}

export default EventDetails;