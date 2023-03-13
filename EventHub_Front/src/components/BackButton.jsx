import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = ({path}) => {

    const navigate = useNavigate()
    const back =  () => {
        console.log(path);
        navigate(path)
    }
    return (
        <button
        onClick={back}
        className='py-4 px-10 bg-pink-50 text-pink-700 shadow-sm shadow-black hover:bg-pink-300 hover:text-gray-900'>
            Retour
        </button>
)
}

export default BackButton