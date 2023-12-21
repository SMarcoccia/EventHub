import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { BackButton } from '@components/public/BackButton'
import { Loading } from '@components/public/Loading'

import { accountService } from '@services'
import { formatDateService } from '@services'
import { eventService } from '@services'

const EventDetails = () => {
    let user = accountService.getUser();

    const [event, setEvent]=useState();
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const location=useLocation();

    const date=event?.date_event.slice(0, 11);
    const heure=event?.date_event.slice(11, event?.date_event.length);

    const fetchEvents = async () => {
        setLoading(true)
        await eventService.getEvent(params.id)
        .then((res) => { 
            res.data.date_event=formatDateService.dateConvertFr(res.data.date_event);
            setEvent(res.data)
        })
        .catch((e) => console.log(e))
        .finally(() => { setLoading(false)})
    }

    const handlePath=()=>{
        let path='';
        if ( location.state?.name === "Home") {
            path='/';
        }else if( location.state?.name === "Events"){
            path='/events';
        }else if(user !== null){
            path= "/user/liste-evenements-utilisateur"
        }
        return path;
    }

    useEffect(() => {
        fetchEvents()
    }, [])

  return (
    <main >
        <div className='ml-7 my-10'>
            <BackButton path={handlePath()}/>
        </div>
            {event && !loading ?
                <div className="flex mx-7">
                    <div className="w-1/2">
                        <img src={`data:image/jpeg;base64,${event.img}`} alt={event.titre} />
                    </div>
                    <div className="w-1/2 pl-10 flex flex-col justify-between">
                    <div>
                        <h2 className="text-5xl font-bold mb-5">{event.titre}</h2>
                        <div className="mb-3">
                            <p><span className="mb-3 font-bold text-xl">Lieu : </span>{event.lieu}</p>
                        </div>
                        <div className="mb-3">
                            {console.log("EventDetails event.date_event : ", event.date_event)}
                            <p><span className="mb-3 font-bold text-xl">Date : </span>{date + " à " + heure}</p>
                        </div>
                        <div className="mb-3">
                            <p><span className="mb-3 font-bold text-xl">Catégorie : </span>{event.type}</p>
                        </div>
                        <div className="mb-3">
                            <p><span className="mb-3 font-bold text-xl">Resumé : </span>{event.resume}</p>
                        </div>
                        <div className="mb-3">
                            <p className="mb-3 font-bold text-xl">Description: </p>
                            <p>{event.description}</p>
                        </div>
                        </div>
                
                        <div className='flex justify-between mt-7'>
                            <p className="text-6xl font-bold">{event.prix} <span className='text-pink-700'>$</span></p>
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