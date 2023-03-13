import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import EventCard from "../components/EventCard"
import Loading from "../components/Loading"
import Separateur from "../components/Separateur"

export const Home = () => {

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const user=JSON.parse(localStorage.getItem("user"))


    const fetchEvents = async () => {
        setLoading(true)
       await axios.get("http://localhost:8081/api/events")
             .then((res) => 
             { 
                console.log(res.data);
                setEvents(res.data)   
            }).catch((e) => console.log(e))
            .finally(() => {
                    setLoading(false)
            })
    }
        
    
    useEffect(() => {

     fetchEvents()

    }, [])


    return (
        <main>
        {/* DESCRIPTION */}
        <section className="lg:flex block gap-5 my-44 container mx-auto">
            <div className="lg:w-1/2 w-full flex flex-col justify-between">
                <div className="flex gap-10">
                    {user == null ? 
                    <Link to={"/register"}>
                    <button className="py-4 px-10 bg-blue-700 text-blue-50 shadow-sm shadow-black hover:bg-blue-300 hover:text-gray-900">
                        
                            S'inscrire
                        
                    </button>
                    </Link>
                    :
                    <a></a>}
                    <Link to={"/events"}>
                    <button className="py-4 px-10 bg-blue-50 text-blue-700 shadow-sm shadow-black hover:bg-blue-300 hover:text-gray-900">
                        
                            Rechercher des événements
                        
                    </button>
                    </Link>
                </div>
            </div>
            <div className="lg:w-1/2 w-full mr-5">
                <img className="rounded-2xl" src="../../public/img/photoHome.jpg" alt="photo-event" />
            </div>
    
        </section>
        {/* SEPATEUR */}
        <Separateur />
    
        {/* EVENEMENTS LES PLUS POPULAIRES */}
        <section className="container">
            <div>
                <h3 className="text-2xl font-bold">Les Meilleurs événements</h3>
                <p>Profitez des meilleurs événements avant leur fin</p>
            </div>
            {/* CARDEVENEMENT */}
            <div className="mt-10 mb-20 gap-7 sm:grid md:grid-cols-2 xl:grid-cols-4 ">
            { events.length  && !loading ? events.slice(-4).map((p) => (
                <EventCard key={p.id} event={p} />
            )) : <Loading />}

            </div>



                
    
        </section>
        {/* SEPATEUR */}
        <Separateur />
    
    </main>
    )
  }