import { accountService } from '@services/accountService';
import React from 'react'
import { Link } from 'react-router-dom'


export const HeaderItem = ({path, title}) => {
    const user=accountService.getUser();

    const removeUser = () => {
        if (user !== null && title === "Déconnexion") {
            localStorage.clear();
            window.location.reload(); // Le rechargement de la page permet d'afficher à nouveau le bouton s'inscrire.
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

