import React from 'react'
import Header from '@components/public/Header'
import Footer from '@components/public/Footer'
import { Outlet } from 'react-router-dom'

const AuLayout = () => {
  return (
    <div id='AuLayout'>
        <Header/>
        <div id='auth'>
            <div id='auth_body'><Outlet/></div>
        </div>
        <Footer/>
    </div>
  )
}

export default AuLayout