import React from 'react'
import Header from '@components/public/Header'
import Footer from '@components/public/Footer'
import { Outlet } from 'react-router-dom'

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