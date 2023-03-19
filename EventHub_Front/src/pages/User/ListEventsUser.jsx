import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BackButton } from '@components/BackButton';


// Liste tout les événements d'un utilisateur.
export const ListEventsUser = () => {

    const user=JSON.parse(localStorage.getItem("user"));
    const navigation = useNavigate();

    const URL = "http://localhost:8081/api/events/";
    const URI_GetEvents = "events-by-user/" 
    const URL_GetEventsPage=URL+URI_GetEvents+user.id+"?page=";
    const pathEvent= "/events/";
    const [events, setEvents]=useState({
        content:[],
        totalPages:'',
        totalElements:'',
        pageSize:'',
        lastPage: false,
        pageNumber:''
    });
    const [loading, setLoading]=useState(false);
    const [pageCurrent, setPageCurrent]=useState(0);
    let offset=10;
    const [startCount, setStartCount] = useState(0)
    let pages=events.totalPages;
    let isOnClick = false;
    let isPreviousPage =false; 
    const [isNextPage, setIsNextPage] = useState(false);
    let count=0;
    //let isCountEgalIdx = false
    let [isCountEgalIdx, setIsCountEgalIdx] = useState(false)
    let start = 0;

    // Récupération de tous les événements d'un utilisateur.
    const fetchEvents = async(url)=>{
        setLoading(true)
        await axios.get(url)
        .then((res)=>{
            // Conversion date au format fr-FR.
            res.data.content=res.data.content.map((event)=>{
                event.date_event=dateConvertFr(event.date_event)
                return event;
            })
            setEvents(res.data)
            
        })
        .catch((e)=>{console.log(e);})
        .finally(()=>{setLoading(false)})
    } 

    const dateConvertFr = (date)=>{
        date=new Date(date);
        date = ('0'+date.getDate()).slice(-2)+"-"+('0'+(date.getMonth()+1)).slice(-2)+"-"+date.getFullYear()+" "+('0'+date.getHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2);
        return date;
    }

    // Suppression d'un événement.
    const deleteEvent = async (event) => {
        setLoading(true)
        await axios.delete(URL+event.id)
        .then((res)=>{
            fetchEvents(URL+URI_GetEvents+user.id+"?page="+pageCurrent)
        })
        .catch((e)=>{console.log(e);})
        .finally(()=>{setLoading(false)})
    }
    
    // Aller à la page de création ou d'édition d'un événemnet.
    const goToCreateUpdateEvent = (event) => {
        let slug = pathEvent;
        event != null ? (slug+="editer-un-evenement/"+event.id) : (slug+="creer-un-evenement")
        navigation(slug);
    }

    // Aller à la page de détail d'un événement.
    const goToReadEvent = (event) => {
        const slug=pathEvent + event.titre.replaceAll(/[` .!?`]/gi, '-').toLowerCase()+event.id
        navigation(slug);
    }

    const onClickEvent = (idx) => {
        fetchEvents(URL_GetEventsPage+idx); 
        isOnClick = true;
        if (count === idx ) {
            setIsCountEgalIdx(true);
            setStartCount(count-offset)
        }else{
            setIsCountEgalIdx(false)
        }
        setPageCurrent(idx)
    }

    const pagination = ()=>{
        const li=[];
        if (pageCurrent >= pages-offset) {
            count = pages-offset;
        }else{
            if (pageCurrent < 0) {
                count=0;
            }else{
                count = pageCurrent;
            }
        }

        if(isCountEgalIdx === false){
            if (pageCurrent === start+offset-1) {
                if (isNextPage === false) {
                    start = count;
                }else{
                    start = 0;
                    count = 0;
                }
            }else if(pageCurrent > start+offset-1){
                count = pageCurrent
                if (count + offset >= pages) {
                    count = pages-offset;
                }
                start=count
            }
            else{
                count=0;
            }
        }else {
            start=startCount+1; 
            count=startCount+1
            if (start < 0 ) {
                start = 0; 
            }
            if (count < 0) {
                count = 0;
            }
        }

        if (pages < offset) {
            offset = pages;
        }else{
            offset = 10;
        }

        for (let i=start; i < count+offset ; i++) 
        {
            li.push(
                <li key={i} className="items-center">
                <a onClick={()=>{onClickEvent(i)}} className={`inline-block w-10 h-10 text-center cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-green-100 hover:text-gray-700 ${pageCurrent === i ? "dark:bg-green-800":"dark:bg-gray-800"} dark:border-gray-700 dark:text-gray-400 dark:hover:bg-green-700 dark:hover:text-white`}>{i+1}</a>
                </li>
            )
        }
        return li;
    }
    
    const previousPage=()=>{
        let count = pageCurrent-1;
        if (count < 0) {count=0}
        fetchEvents(URL_GetEventsPage+count);
        setPageCurrent(count)
        isPreviousPage = true;
        setIsNextPage(false);
        if (start === count) {
            setIsCountEgalIdx(false)
        }
    }
    
    const nextPage=()=>{
        let count = pageCurrent+1
        if(pageCurrent+1 > pages-1){count-=1} // Evite de voir disparaitre la dernière page.
        fetchEvents(URL_GetEventsPage+count);
        setPageCurrent(count)
        setIsNextPage(true);
        isPreviousPage = false
        setIsCountEgalIdx(false)
    }
    
    useEffect(()=>{
        fetchEvents(URL+URI_GetEvents+user.id);
    }, [])

    return (
    <div>
        <div className='py-4'>
            <BackButton path={"/user-home"} />
        </div>
        <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
            <h1 className="font-serif text-3xl font-bold underline decoration-gray-400">Votre liste des événements</h1>
            <div className="flex justify-between mx-5">
                <div className="font-serif mt-5 text-1xl decoration-gray-400">Vous avez {events.totalElements} événements <span className='ml-5'>Page {pageCurrent+1}</span></div>
                <button onClick={()=>goToCreateUpdateEvent()} className="px-4 py-2 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600">Créer un événement</button>
            </div>
        </div>

        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
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

            <tbody className="bg-white">
                {events.content.map((event)=>
                <tr key={event.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p>{event.id}</p>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-900">
                        <img width={60} height={60} src={`data:image/jpeg;base64,${event.img}`} alt={event.titre}/>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p>{event.titre.substring(0, 45)}</p>
                </td>
                <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    <span>{event.resume}</span>
                </td>
                <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    <span>{event.date_event}</span>
                </td>

                <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                    <button onClick={()=>goToCreateUpdateEvent(event)} className="text-indigo-600 hover:text-indigo-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    </button>
                </td>

                <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                    <button onClick={()=>goToReadEvent(event)} className="text-gray-600 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    </button>
                </td>

                <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
                    <button onClick={()=>deleteEvent(event)} className="text-gray-600 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600 hover:text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    </button>
                </td>
                </tr>
                )}
            </tbody>
            </table>
            </div>
            </div>
        </div>
        {console.log(pages)}
        { pages ? <div className="flex justify-center my-9">
            <nav >
            <ul className="inline-flex items-center -space-x-px">
                <li>
                <a onClick={()=>previousPage()} className="cursor-pointer inline-block w-10 h-10 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"><FontAwesomeIcon icon={faArrowLeft} /></a>
                </li>
                    {pagination()}
                <li>
                <a onClick={()=>nextPage()} className="cursor-pointer inline-block w-10 h-10 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"><FontAwesomeIcon icon={faArrowRight} /></a>
                </li>
            </ul>
            </nav>
        </div> : ''}
        </div>
    </div>
  )
}
