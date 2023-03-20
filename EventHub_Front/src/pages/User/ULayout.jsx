import { BackButton } from '@components/BackButton';
import { Header } from '@components/Header';
import { Footer } from '@components/public/Footer';
import React from 'react'
import { Outlet } from 'react-router-dom';

const ULayout = () => {
    return(
    <>
        <Header />
        <div id='user_body'><Outlet/></div>
        <Footer />
    </>
  )
}

export default ULayout;