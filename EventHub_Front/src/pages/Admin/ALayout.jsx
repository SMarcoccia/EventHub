import React from 'react'
import { Outlet } from 'react-router-dom'

const ALayout = () => {
  return (
    <div className='ALayout'>ALayout
        <Header />
        <div id="admin_body"><Outlet/></div>
        <Footer />
    </div>
  )
}

export default ALayout