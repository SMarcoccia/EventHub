import Header from '@components/public/Header'
import Footer from '@components/public/Footer'
import React from 'react'
import { Outlet } from 'react-router-dom'

const PLayout = () => {
  return (
    <>
    <Header />
    <div id="public_body"><Outlet/></div>
    <Footer />
    </>
  )
}

export default PLayout