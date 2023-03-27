import React from 'react'
import SideMenu from './SideMenu'

const AHeader = () => {
  return (
    <header className='flex justify-between items-center bg-gradient-to-r from-blue-300 to-blue-400'>
    <div id='sideMenu' className='container mx-5 justify-between py-5 flex items-center'>
        <SideMenu/>   
    </div>
    </header>
  )
}

export default AHeader