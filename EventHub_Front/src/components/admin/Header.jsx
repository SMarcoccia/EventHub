import React from 'react'
import SideMenu from './SideMenu'

const Header = () => {
  return (
    <header className='flex justify-between items-center bg-gradient-to-r from-blue-300 to-blue-400'>
    <div className='container mx-5 justify-between py-5 flex items-center'>
        <SideMenu/>   
    </div>
    </header>
  )
}

export default Header