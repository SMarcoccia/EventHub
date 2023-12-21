import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '@components/public/Footer'
import { accountService } from '@services/accountService'
import AHeader from '@components/admin/AHeader'
import PHeader from '@components/public/PHeader'
import UHeader from '@components/user/UHeader'

import '../../App.css'

const PLayout = () => {

    let user=accountService.getUser();
    let roles=user?.roles.includes("ADMIN");

    return (
    <>
        {user==null ? <PHeader /> : roles ? <AHeader/> : <UHeader/>}
        <div className='container' id="public_body"><Outlet/></div>
        <Footer />
    </>
    )
}

export default PLayout