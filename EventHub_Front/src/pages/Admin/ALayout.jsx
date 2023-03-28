import AHeader from '@components/admin/AHeader'
import Footer from '@components/public/Footer'
import React from 'react'
import { Outlet } from 'react-router-dom'

const ALayout = () => {
  return (
    <div className='ALayout'>
        <AHeader />
        <div id="admin">
			<div className='container' id="admin_body"><Outlet/></div>
        </div>
        <Footer />
    </div>
  )
}

export default ALayout