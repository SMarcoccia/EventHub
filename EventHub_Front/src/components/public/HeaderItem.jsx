import { accountService } from '@services/accountService';
import React from 'react'
import { Link } from 'react-router-dom'


export const HeaderItem = ({path, title}) => {
    const user=accountService.getUser();

    const removeUser = () => {
        if (user !== null && title === "Déconnexion") {
            accountService.logout();
            // Le rechargement de la page permet d'afficher à nouveau le bouton s'inscrire si on se déconnecte.
            window.location.reload(); 
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

