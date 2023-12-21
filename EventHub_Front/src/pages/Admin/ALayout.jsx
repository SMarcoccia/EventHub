import React from 'react'
import { Outlet } from 'react-router-dom'

import AHeader from '@components/admin/AHeader'
import Footer from '@components/public/Footer'

const ALayout = () => {
  return (
    <>
        <AHeader />
        <div className='container' id="admin_body"><Outlet/></div>
        <Footer />
    </>
  )
}

export default ALayout