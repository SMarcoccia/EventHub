import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import imgLogo from "@img/logo.png";

export const PSideMenu = ({title="EventHub"}) => {
    
    const navigate = useNavigate()
    const path = {home: '/', search: '/events', register: '/auth/register', connexion: '/auth/login'}
    
    return (
        <div className='flex justify-between items-center bg-gradient-to-r from-blue-300 to-blue-400'>
        {/* LOGO */}
        <div className='container mx-5 justify-between py-5 flex items-center'>
        <div
            onClick={() => navigate('/')}
            className='flex gap-3 items-center cursor-pointer'>
        <img 
            src={imgLogo} 
            alt="logo-EventHub"
            width={40}
            height={40} 
        />
        <h3 className='logo text-xl font-bold'>{title}</h3>
        </div>
        
        {/* LIENS */}
        <nav>
        <ul className='flex justify-between gap-10 font-bold'>
            <li ><Link to={path.home}>Accueil</Link></li>
            <li><Link to={path.search}>Rechercher</Link></li>
            {
                window.location.pathname !== "/auth/register" &&
                <li><Link to={path.register}>Inscription</Link></li>
            }
            {
                window.location.pathname !== "/auth/login" &&
                <li><Link to={path.connexion}>Connexion</Link></li>
            }
        </ul>
        </nav>
        </div>
    </div>
    )

}
