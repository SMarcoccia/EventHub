import axios from "axios"
import { useEffect, useState } from "react"
import { Loading } from "@components/public/Loading"
import { EventCard } from "@components/public/EventCard"
import Pagination from "@components/public/Pagination"
import { accountService } from "@services/accountService"
import { BackButton } from "@components/public/BackButton"
import { formatDateService } from "@services/formatDateService"
import SearchEvents from "@components/public/SearchEvents"

const Events = () => {
    const user=accountService.getUser();
    const URL="http://localhost:8081/api/events"
    const URL_List=URL+"/list/";
    const URL_Page="?page=";
    const URL_Type='&type='
    const URL_Search="&search="

    let events= {
        content:[],
        totalPages:'',
        totalElements:'',
        pageSize:'',
        lastPage: false,
        pageNumber:''
    }; 

    const [numPage, setNumPage]=useState(0);
    // Pour pallier au problème d'asynchrone du useState cela permettra d'avoir les données modifier immédiatement dans le render.
    const [eventsBis, setEventsBis] = useState(events);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [errorMsg, setErrorMsg]=useState("");
    
    const fetchEvents = async (numPage, type, search) => {
        setLoading(true)
        let API_URL ="";
        let userId=0;

        if(window.location.pathname === "/user/liste-evenements-utilisateur"){
            // Les événements de l'utilisateur.
            userId=user.id;
        }

        API_URL=URL_List+userId+URL_Page+numPage+URL_Type+type+URL_Search+search;
        await axios.get(API_URL)
            .then(res =>
            { 
                if(res.data.success)
                {
                    try {
                        // Conversion date au format fr-FR.
                        res.data.events.content=res.data.events.content.map((event)=>{
                            event.date_event=formatDateService.dateConvertFr(event.date_event)
                            return event;
                        })
        
                        Object.assign(events, res.data.events)   
                        setEventsBis(events)
                        setErrorMsg("")
                    } catch (e) {
                        console.log(e);
                    }
                }else{
                    setEventsBis("")
                    setErrorMsg(res.data.message);
                }
            }).catch((e) => {
                console.log(e)
                setErrorMsg(e.res.data.message)
            })
            .finally(() => {
                    setLoading(false)
            })
    }

    useEffect(() => {
        fetchEvents(numPage, category, search)

    }, [search, category])

    return (
        <main className="my-10 container mx-auto">
            <div className="ml-7 my-10">
                <BackButton path={"/"}/>
            </div>
            
            {/* DESCRIPTION */}
            <div className="ml-7">
                <SearchEvents fetchEvents={fetchEvents} numPage={numPage} errorMsg={errorMsg} totalElements={eventsBis.totalElements}/>
            </div>

            {/* LISTE DES PRODUITS */}
            {errorMsg === "" && <div className="mt-10 mb-20 ml-7 gap-7 sm:grid md:grid-cols-2 xl:grid-cols-4">
                { eventsBis.content.length  && !loading ? eventsBis.content.map((p) => (
                    <EventCard key={p.id} event={p} name={Events.name}/>
                )) : <Loading />}
            </div> }
            
            {errorMsg && <div className="flex justify-center mb-4 rounded-lg bg-info-100 px-6 py-5 text-2xl text-info-800">
                {errorMsg}
            </div>}

            <Pagination fetchEvents={fetchEvents} pages={eventsBis.totalPages}  category={category} search={search} numPage={setNumPage}/>
        </main>
    )
  }
  
  export default Events;