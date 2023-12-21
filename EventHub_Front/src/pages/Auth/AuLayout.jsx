import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '@components/public/PHeader'
import Footer from '@components/public/Footer'

const AuLayout = () => {
  return (
    <>
        <Header/>
        <div className='container' id='auth_body'><Outlet/></div>
        <Footer/>
    </>
  )
}

export default AuLayout