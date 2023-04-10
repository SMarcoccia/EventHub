import axios from "axios"
import { useEffect, useState } from "react"
import { Loading } from "@components/public/Loading"
import { EventCard } from "@components/public/EventCard"
import Pagination from "@components/public/Pagination"

const Events = () => {
    const URL = "http://localhost:8081/api/events"
    const URL_GetEventsPage=URL+"?page=";
    let numPage = '0';
    let typeEvent = '&type='
    let events= {
        content:[],
        totalPages:'',
        totalElements:'',
        pageSize:'',
        lastPage: false,
        pageNumber:''
    }; 

    // Pour pallier au problème d'asynchrone du useState cela permettra d'avoir les données modifier immédiatement dans le render.
    const [eventsBis, setEventsBis] = useState(events)
    //const [filteredEvents, setFilteredEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    
    const resetFilter = () => {
        setSearch("")
        setCategory("")
    }

    const fetchEvents = async (numPage, filter) => {
        setLoading(true)
        let API_URL ="";
        if (user && Object.keys(user).length === 0 && Object.getPrototypeOf(user) === Object.prototype) {
            API_URL=URL_GetEventsPage+numPage+typeEvent+filter
        }else{
            API_URL=URL+"/events-by-user/"+user.id+"?page="+numPage
            console.log("API_URL : ", API_URL);
        }
        await axios.get(API_URL)
            .then((res) => 
            { 
                // Reload si paginatino est à la fin.
                //if (res.data.totalPages < pages) {
                //    window.location.reload(false);
                //}
                
                // Conversion date au format fr-FR.
                res.data.content=res.data.content.map((event)=>{
                    event.date_event=dateConvertFr(event.date_event)
                    return event;
                })

                Object.assign(events, res.data)   
                setEventsBis(events)
            }).catch((e) => console.log(e))
            .finally(() => {
                    setLoading(false)
            })
    }

    // TODO : à mettre dans service.
    const dateConvertFr = (date)=>{
        date=new Date(date);
        date = ('0'+date.getDate()).slice(-2)+"-"+('0'+(date.getMonth()+1)).slice(-2)+"-"+date.getFullYear()+" "+('0'+date.getHours()).slice(-2)+":"+('0'+date.getMinutes()).slice(-2);
        return date;
    }

    useEffect(() => {
        fetchEvents(numPage, category)
    },  [category])


    //useEffect(() => {
    //    console.log("category : ", category);
    //    fetchEvents(numPage, category) 
    //    let result;
    //    // checker la categorie
    //    if(category != "Tout" ) {
    //    result = events.content.filter((event) => {
    //        return (
    //        event.type === category && (
    //            event.titre.toLowerCase().includes(search.toLowerCase()) ||
    //            event.description.toLowerCase().includes(search.toLowerCase()))
    //        )
    //    })
    //    }else {
    //    result = events.content.filter((event) => {
    //        return (
    //        event.titre.toLowerCase().includes(search.toLowerCase()) ||
    //        event.description.toLowerCase().includes(search.toLowerCase())
    //        )
    //    })
    //    }
        
    //    //setFilteredEvents(result)

    //}, [events, search, category])

    return (

        // La barre comparera avec le titre et la description
        // Le select pour la catégorie
        // les filtre sont cumulables 
        // Afficher un bouton pour effacer les filtres seulement quand
        // ils sont remplis
        <main className="my-10 container mx-auto">
            {/* DESCRIPTION */}
            <div className="ml-7">
            <div>
                <h3 className="text-2xl font-bold">Faites votre choix</h3>
                <p>Profitez des meilleurs événements avant leur fin</p>
            </div>
            {/* FORMULAIRE */}
            <div className="my-4 flex gap-6">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="py-2 px-6 leading-none bg-gray-900 text-slate-100  focus:outline-none focus:border-pink-700  border-b-2 border-pink-50"
                    placeholder="Evénement..." 
                    type="search"  />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="py-2 px-6 bg-gray-900 text-slate-100"
                    name="cat"
                    id="cat" >
                        <option value="">Tout</option>
                        <option value="ART">Art</option>
                        <option value="AUTRE">Autre</option>
                        <option value="CULTUREL">Culture</option>
                        <option value="EXPO">Expo</option>
                        <option value="MUSIQUE">Musique</option>
                        <option value="SPORTIF">Sportif</option>
                </select>

                {
                    search.length > 1 && 
                    <button
                    onClick={resetFilter}
                    className="font-bold text-2xl text-pink-700">X</button>
                }   
            </div>

            {/* RESULTAT */}
            <div>
            <p>Résultat : <span>{eventsBis.totalElements}</span></p>
            {/*<p>Résultat : <span>{filteredEvents.length}</span></p>*/}
            </div>
            </div>
            {/* LISTE DES PRODUITS */}
              <div className="mt-10 mb-20 ml-7 gap-7 sm:grid md:grid-cols-2 xl:grid-cols-4">
            {/*{ events.content.length  && !loading ? filteredEvents.map((p) => (*/}

            { eventsBis.content.length  && !loading ? eventsBis.content.map((p) => (
                <EventCard key={p.id} event={p} />
            )) : <Loading />}

            </div>
            <Pagination pages={eventsBis.totalPages} fetchEvents={fetchEvents} category={category}/>
        </main>
    )
  }
  
  export default Events;