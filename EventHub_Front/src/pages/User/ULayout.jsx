import Header from '@components/public/Header';
import Footer from '@components/public/Footer';
import React from 'react'
import { Outlet } from 'react-router-dom';

const ULayout = () => {
    return(
    <>
        <Header />
        <div className='container' id='user_body'><Outlet/></div>
        <Footer />
    </>
  )
}

export default ULayout;