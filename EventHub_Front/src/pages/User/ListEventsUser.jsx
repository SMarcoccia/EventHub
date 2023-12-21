import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { BackButton } from '@components/public/BackButton';
import Pagination from '@components/public/Pagination';
import SearchEvents from '@components/public/SearchEvents';
import { Loading } from '@components/public/Loading';

import { accountService } from '@services';
import { eventService } from '@services';


// Liste tout les événements d'un utilisateur.
const ListEventsUser = () => {
    const location=useLocation();
    const navigate = useNavigate();

    const user=accountService.getUser();
    const pathEventEditCreate = "/user/";

    let events={
        content:[],
        totalPages:'',
        totalElements:'',
        pageSize:'',
        lastPage: false,
        pageNumber:''
    };

    const [numPage, setNumPage]=useState(0);
    const [eventsBis, setEventsBis] = useState(events);
    const [loading, setLoading]=useState(false);
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const [errorMsg, setErrorMsg]=useState("");
    const [msgDeleteEvent, setMsgDeleteEvent]=useState("");
    const [msgCreateUpdateEvent, setMsgCreateUpdateEvent]=useState(location.state?.message);

    // Récupération des événements.
    const fetchEvents = async (numPage, type, search) => {
        setLoading(true)
        let username=""; 

        if(user != null && window.location.pathname === "/user/liste-evenements-utilisateur"){
            username=user.username;
        }
        const res=await eventService.getAllEventsByUser(username, numPage, type, search);
        try {
            if(res.success){
                setEventsBis(res.events)
                setErrorMsg("")
            }else{
                setEventsBis("")
                setErrorMsg(res.message);
            }
        } catch (error) {
            setErrorMsg(error.res.message)
        } finally{
            setLoading(false);
        }
    }

    // Aller à la page de création ou d'édition d'un événemnet.
    const goToCreateUpdateEvent = (event) => {
        let slug = pathEventEditCreate;
        event != null ? (slug+="editer-un-evenement/"+event.id) : (slug+="creer-un-evenement")
        navigate(slug);
    }

    const goToEvent=(event)=>{
        navigate("/events/"+event.id, {state: {name: ListEventsUser.name}});
    }

    // Suppression d'un événement.
    const deleteEvent = async (event) => {
        setLoading(true)
        await eventService.deleteEvent(event.id)
        .then((response)=>{
            if(response.data.success){
                setEventsBis(response.data.events);
                setMsgDeleteEvent("L'événement à été supprimé avec succès");
            }
        })
        .catch((e)=>{console.log(e);})
        .finally(()=>{setLoading(false)})
    }
    
    const messageDeleteEvent=()=>{
        setTimeout(() => {
            setMsgDeleteEvent("");
        }, 3000);
    }

    const messageCreateUpdateEvent=()=>{
        setTimeout(() => {
            setMsgCreateUpdateEvent("");
        }, 3000);
    }

    useEffect(()=>{
        if(user === null) return
        fetchEvents(numPage, category, search)
    }, [])
    
    return (
    <main className="my-10 container mx-auto">
        <div className='ml-7 my-10'>
            <BackButton path={"/user/home"} />
        </div>
        <h1 className="flex justify-center font-serif text-3xl font-bold underline decoration-gray-400">Votre liste d'événements</h1>
        
        {/* MESSAGE ACTION */}
        {msgDeleteEvent && <div className='mx-10 text-center my-4 py-4 px-10 bg-lime-50 text-lime-700 shadow-sm shadow-black'>{msgDeleteEvent} {messageDeleteEvent()}</div>}
        {msgCreateUpdateEvent && <div className='mx-10 text-center my-4 py-4 px-10 bg-lime-50 text-lime-700 shadow-sm shadow-black'>{msgCreateUpdateEvent} {messageCreateUpdateEvent()}</div>}

        {/* DESCRIPTION */}
        <div className="flex justify-between mx-10 mt-10">
            <div><SearchEvents fetchEvents={fetchEvents} numPage={numPage} setNumPage={setNumPage} category={category} setCategory={setCategory} errorMsg={errorMsg} totalElements={eventsBis.totalElements}/></div>
            <div className="flex items-end">
                <button onClick={()=>goToCreateUpdateEvent(null)} className="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600">Créer un événement</button>
            </div>
        </div>
        {/* Si aucun événement n'a été trouvé */}
        {errorMsg ? 
        <div className="flex justify-center mb-4 rounded-lg bg-info-100 px-6 py-5 text-2xl text-info-800">
            {errorMsg}
        </div> :

        /* TABLEAU */
        <div>
            <div className="container max-w-7xl mx-auto mt-8">
                 <div className="flex flex-col">
                    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                    <table className="min-w-full">
                    <thead>
                        <tr>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            ID</th>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Image</th>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Titre</th>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Résumé</th>
                        <th
                            className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                            Date de l'événement</th>
                        <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50" colSpan="3">
                            Action</th>
                        </tr>
                    </thead>
                    {eventsBis.content.length && !loading ?
                    <tbody className="bg-white">
                        {eventsBis.content.map((event)=>
                        <tr key={event.id}>
                            <td
                                onClick={()=>goToEvent(event)} className="cursor-pointer px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p>{event.id}</p></td>
                            <td
                                onClick={()=>goToEvent(event)} className="cursor-pointer px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div className="text-sm leading-5 text-gray-900">
                                    <img width={60} height={60} src={`data:image/jpeg;base64,${event.img}`} alt={event.titre}/>
                                </div></td>
                            <td
                                onClick={()=>goToEvent(event)} className="cursor-pointer px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p>{event.titre.substring(0, 45)}</p></td>
                            <td
                                onClick={()=>goToEvent(event)} className="cursor-pointer px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                <span>{event.resume}</span></td>
                            <td
                                onClick={()=>goToEvent(event)} className="cursor-pointer px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                <span>{event.date_event}</span></td>

                            <td
                                className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                                <button onClick={()=>goToCreateUpdateEvent(event)} className="text-indigo-600 hover:text-indigo-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                </button></td>

                            <td
                                className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                                <button onClick={()=>goToEvent(event)} className="text-gray-600 hover:text-gray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                </button></td>

                            <td
                                className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                                <button onClick={()=>deleteEvent(event)} className="text-gray-600 hover:text-gray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600 hover:text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                </button></td>
                        </tr>
                        )} 
                    </tbody>: <tbody><tr><td colSpan="6" className='text-center'><Loading/></td></tr></tbody>}
                    </table>
                    </div>
                </div>
            </div>
            <Pagination pages={eventsBis.totalPages} fetchEvents={fetchEvents} category={category} setCategory={setCategory} search={search} numPage={numPage} setNumPage={setNumPage}/>
        </div>}
    </main>
  )
}

export default ListEventsUser;