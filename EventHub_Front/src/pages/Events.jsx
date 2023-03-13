import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import EventCard from "../components/EventCard"

export const Events = () => {
  const API_URL = "http://localhost:8081/api/events"

  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("Tout")


  const resetFilter = () => {
    setSearch("")
    setCategory("Tout")
  }



  const fetchEvents = async () => {
      setLoading(true)
     await axios.get(API_URL)
           .then((res) => 
           { 
               setEvents(res.data)   
          }).catch((e) => console.log(e))
          .finally(() => {
                  setLoading(false)
          })
  }
  useEffect(() => {
    fetchEvents()
   }, [])

   useEffect(() => {
     let result;
     // checker la categorie
     if(category != "Tout" ) {
       result = events.filter((event) => {
         return (
          event.type === category && (
            event.titre.toLowerCase().includes(search.toLowerCase()) ||
            event.description.toLowerCase().includes(search.toLowerCase()))
         )
       })

     }else {
      result = events.filter((event) => {
        return (
          event.titre.toLowerCase().includes(search.toLowerCase()) ||
          event.description.toLowerCase().includes(search.toLowerCase())
        )
      })
     }
     
     setFilteredEvents(result)

   }, [events, search, category])

    return (

        // La barre comparera avec le titre et la description
        // Le select pour la catégorie
        // les filtre sont cumulables 
        // Afficher un bouton pour effacer les filtres seulement quand
        // ils sont remplis
        <main className="my-10 container mx-auto">
          {/* DESCRIPTION */}
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
                id="cat" 
               >
                 <option 
                 value="Tout">Tout</option>
                        <option value="ART">Art</option>
                        <option value="AUTRE">Autre</option>
                        <option value="CULTUREL">Culture</option>
                        <option value="EXPO">Expo</option>
                        <option value="MUSIQUE">Musique</option>
                        <option value="SPORTIF">Sportif</option>
                </select>

              {search.length > 1 && 
              <button
              onClick={resetFilter}
              className="font-bold text-2xl text-pink-700">X</button>
          }

            </div>

             {/* RESULTAT */}
             <div>
               <p>Résultat : <span>{filteredEvents.length}</span></p>
             </div>

              {/* LISTE DES PRODUITS */}
              <div className="mt-10 mb-20 gap-7 sm:grid md:grid-cols-2 xl:grid-cols-4">
            { events.length  && !loading ? filteredEvents.map((p) => (
                <EventCard key={p.id} event={p} />
            )) : <Loading />}

            </div>


        </main>

      
    )
  }
  