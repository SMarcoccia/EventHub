import React from 'react'
import { Link } from 'react-router-dom'

const SideMenu = () => {
  return (
    <div className='flex justify-between items-center bg-gradient-to-r from-blue-300 to-blue-400'>
        <ul>
            <li><Link to="/">Accueil</Link></li>
            <li>&nbsp;</li>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li>Utilisteurs :
                <ul>
                    <li><Link to="/admin/listUsers">Liste</Link></li>
                </ul>
            </li>
        </ul>    
    </div>
  )
}

export default SideMenu