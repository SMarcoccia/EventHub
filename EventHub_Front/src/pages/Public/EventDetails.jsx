import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BackButton } from '@components/public/BackButton'
import { Loading } from '@components/public/Loading'
import { accountService } from '@services/accountService'

const EventDetails = () => {
    let user = accountService.getUser();

    const [event, setEvent]=useState();
    const [loading, setLoading] = useState(false)
    const params = useParams()
    
    const fetchEvents = async () => {
        setLoading(true)
        await axios
        .get("http://localhost:8081/api/events/"+params.slug)
        .then((res) => { 
            res.data.date_event=dateConvertFr(res.data.date_event);
            setEvent(res.data)
        })
        .catch((e) => console.log(e))
        .finally(() => { setLoading(false)})
    }

    const dateConvertFr = (date)=>{
        date=new Date(date);
        date = ('0'+date.getDate()).slice(-2)+"-"+('0'+(date.getMonth()+1)).slice(-2)+"-"+date.getFullYear()+" "+('0'+date.getHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2);
        return date;
    }
    
    useEffect(() => {
     fetchEvents()
    }, [])

  return (
    <main >
            {
                event && !loading ?
                    <div className='mx-7'>
                        <div className='py-4'>
                            <BackButton path={ user !== null ? "/user/liste-evenements-utilisateur" : window.localStorage.getItem("path")}/>
                        </div>

                        <div className="flex">
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
                                    <p><span className="mb-3 font-bold text-xl">Date : </span>{event.date_event}</p>
                                </div>
                                <div className="mb-3">
                                    <p><span className="mb-3 font-bold text-xl">Resumé : </span>{event.resume}</p>
                                </div>
                                <div className="mb-3">
                                    <p className="mb-3 font-bold text-xl">Description: </p>
                                    <p>{event.description}</p>
                                </div>

                                <div className="mb-3">
                                    <p><span className="mb-3 font-bold text-xl">Catégorie : </span>{event.type}</p>
                                </div>

                                </div>
                                
                         
                                <div className='flex justify-between mt-7'>
                                    <p className="text-6xl font-bold">{event.prix} <span className='text-pink-700'>$</span></p>
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