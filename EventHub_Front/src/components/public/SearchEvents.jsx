import React, { useEffect, useState } from 'react'

function SearchEvents(props) {

    const [search, setSearch] = useState("");
    const zeroEvent="0";

    const resetFilter = () => {
        setSearch("")
        props.setCategory("")
    }

    useEffect(() => {
        props.setNumPage(0);
        props.fetchEvents(0, props.category, search)
    }, [props.category, search])

    return (
        <div>
        <h3 className="text-2xl font-bold">Faites votre choix</h3>

        {/* FORMULAIRE */}
        <div className="my-4 flex gap-6">
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="py-2 px-6 leading-none bg-gray-900 text-slate-100  focus:outline-none focus:border-pink-700  border-b-2 border-pink-50"
                placeholder="Evénement..." 
                type="search"  />
            <select
                value={props.category}
                onChange={(e) => props.setCategory(e.target.value)}
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
            <p className="searchEventRes font-serif mt-5 text-1xl decoration-gray-400">
                Résultat : <span className='mr-10'>
                    {props.errorMsg ? zeroEvent : props.totalElements}</span>Page {props.errorMsg ? zeroEvent : props.numPage+1}</p>
        </div>
  )
}

export default SearchEvents