import React from 'react'
import { Outlet } from 'react-router-dom'

const ALayout = () => {
  return (
    <div className='ALayout'>ALayout
        <div id="admin_body"><Outlet/></div>
    </div>
  )
}

export default ALayout