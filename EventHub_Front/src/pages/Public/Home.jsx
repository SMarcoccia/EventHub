import { Link } from "react-router-dom"
import { EventCard } from "@components/public/EventCard"
import { Separateur } from "@components/public/Separateur"
import { Loading } from "@components/public/Loading"

import { accountService } from "@services"
import { eventService } from "@services"

import { useQuery } from "react-query"


const Home = () => {

    let {isLoading, data} = useQuery('eventsUser', ()=>eventService.getAllEventsByUser(0, 0, "", ""));

    const user=accountService.getUser();

    return (
        <main>
        <div className="flex justify-center px-6 py-10">
            <h1 className="text-4xl font-bold">Événements pour tous sur la région Rhône-Alpes</h1>
        </div>
        <div className="lg:w-1/2 m-auto my-10">
            <img className="rounded-2xl" src="../../public/img/photoHome.jpg" alt="photo-event" />
        </div>
        
        {/* DESCRIPTION */}
        <section className="lg:flex justify-center block gap-5 my-10 container mx-auto">
            <div className="flex flex-col justify-between">
                <div className="flex gap-10">
                    {user === null ? 
                    <Link to={"/auth/register"}>
                    <button className="py-4 px-10 bg-blue-700 text-blue-50 shadow-sm shadow-black hover:bg-blue-300 hover:text-gray-900">
                        S'inscrire
                    </button>
                    </Link>
                    :''}
                    <Link to={"/events"}>
                    <button className="py-4 px-10 bg-blue-50 text-blue-700 shadow-sm shadow-black hover:bg-blue-300 hover:text-gray-900">
                        Rechercher des événements
                    </button>
                    </Link>
                </div>
            </div>
        </section>

        {/* SEPATEUR */}
        <Separateur />

        {/* EVENEMENTS LES PLUS POPULAIRES */}
        <section className="container">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Les événements les plus attendus</h3>
            </div>

            {/* CARDEVENEMENT */}
            <div className="sm:flex sm:justify-center justify-around mt-10 mb-20">
            { data!==undefined  && !isLoading ? data.events.content.slice(-4).map((p) => (
                <EventCard key={p.id} event={p} name={Home.name}/>
            )) : <Loading />}
            </div>
        </section>
        {/* SEPATEUR */}
        <Separateur />
    
    </main>
    )
  }

  export default Home;