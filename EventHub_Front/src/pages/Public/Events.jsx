import { useEffect, useState } from "react"
import { Loading } from "@components/public/Loading"
import { EventCard } from "@components/public/EventCard"
import Pagination from "@components/public/Pagination"
import { BackButton } from "@components/public/BackButton"
import SearchEvents from "@components/public/SearchEvents"

import { accountService } from "@services"
import { eventService } from "@services"


const Events = () => {
    const user=accountService.getUser();

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
        let username="-1";
        if(window.location.pathname === "/user/liste-evenements-utilisateur"){
            // Les événements de l'utilisateur.
            username=user.username;
        }
        if(type===undefined){type=""}

        await eventService.getAllEvents(username, numPage, type, search)
        .then(res =>
        { 
            if(res.data.success)
            {
                try {
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
    }, [])

    return (
        <main className="my-10 container mx-auto">
            <div className="ml-7 my-10">
                <BackButton path={"/"}/>
            </div>
            
            {/* RECHERCHE EVENEMENT */}
            <div className="ml-7">
                 <SearchEvents fetchEvents={fetchEvents} numPage={numPage} setNumPage={setNumPage} category={category} setCategory={setCategory} errorMsg={errorMsg} totalElements={eventsBis.totalElements}/>
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
            <Pagination pages={eventsBis.totalPages} fetchEvents={fetchEvents} category={category} setCategory={setCategory} search={search} numPage={numPage} setNumPage={setNumPage}/>
        </main>
    )
  }
  
  export default Events;