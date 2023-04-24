import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import imgLogo from "@img/logo.png";
import { accountService } from '@services';

import './sideMenu.css'

const SideMenu = ({title="EventHub"}) => {

    const admin= accountService.getUser();
    const navigate=useNavigate();
    const path = {home: '/', dashboard: '/admin/home', listusers: '/admin/user/listes-utilisateurs', deconnexion: '/'}

    const logoutAdmin = ()=>{
        accountService.logout();
    }
   
    return (
    <>
        {/* LOGO */}
        <div
            onClick={() => navigate('/')}
            className='flex gap-3 items-center cursor-pointer'>
        <img 
            src={imgLogo} 
            alt="logo-EventHub"
            width={40}
            height={40} 
        />
        <h3 className='text-xl font-bold'>{title}</h3>
        </div>
        {/* LIENS */}
        <nav>
        <ul className='flex justify-between gap-10 font-bold'>
            <li><styleLink to={path.home}>Accueil</styleLink></li>
            <li><Link to={path.dashboard}>Mon Compte</Link></li>
            <li><Link to={path.listusers}>Liste utilisateurs</Link></li>
            <li><Link to={path.deconnexion} onClick={logoutAdmin}>Déconnexion</Link></li>
        </ul>
        </nav>    
    </>
  )
}

export default SideMenu