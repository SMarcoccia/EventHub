import Header from '@components/admin/Header'
import Footer from '@components/public/Footer'
import React from 'react'
import { Outlet } from 'react-router-dom'

const ALayout = () => {
  return (
    <div className='ALayout'>
        <Header />
        <div id="admin">
			<div id="admin_body"><Outlet/></div>
        </div>
        <Footer />
    </div>
  )
}

export default ALayout