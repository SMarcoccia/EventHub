import React from 'react'
import { Link } from 'react-router-dom'

export const HeaderItem = ({path, title}) => {
    const user= JSON.parse(localStorage.getItem("user"))

    const removeUser = () => {
        if (user !== null && title === "Déconnexion") {
            localStorage.clear();
        }
    }

    return (
    <li className='font-bold cursor-pointe'>
    <Link
        onClick={removeUser}
        className='leading-tight dark:hover:text-green-700'
        to={path}>{title}
    </Link>
    </li>
    )
}

