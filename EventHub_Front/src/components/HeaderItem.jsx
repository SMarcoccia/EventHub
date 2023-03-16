import React from 'react'
import { json, Link, useLocation } from 'react-router-dom'

const HeaderItem = ({path, title}) => {
    const user= JSON.parse(localStorage.getItem("user"))
    const location = useLocation()

    const removeUser = () => {
        console.log(title + " - "+title === "Déconnexion");
        if (user !== null && title === "Déconnexion") {
            localStorage.clear();
        }
    }

    return (
    <li className='font-bold cursor-pointer'>
    <Link
        onClick={removeUser}
        className='cursor-pointer px-3 py-2 leading-tight dark:hover:text-green-700'
        to={path}>{title}</Link>
    </li>
    )
}

export default HeaderItem