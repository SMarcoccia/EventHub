import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './sideMenu.css'
// Image Logo :
import imgLogo from "@img/logo.png";

const SideMenu = ({title="EventHub"}) => {
    const admin=JSON.parse(localStorage.getItem("admin"))
    const navigate=useNavigate();
    const path = {home: '/', dashboard: '/admin/dashboard', listusers: '/admin/user/listes-utilisateurs'}
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
        <ul className='flex justify-between gap-10'>
            <li className='font-bold'><Link to={path.home}>Accueil</Link></li>
            <li><Link to={path.dashboard}>Dashboard</Link></li>
            <li>Utilisteurs :
                <ul>
                    <li><Link to={path.listusers}>Liste</Link></li>
                </ul>
            </li>
        </ul>
        </nav>    
    </>
  )
}

export default SideMenu