import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';

import Footer from '@components/public/Footer';
import UHeader from '@components/user/UHeader';
import AHeader from '@components/admin/AHeader';
import PHeader from '@components/public/PHeader';
import { accountService } from '@services/accountService';

const ULayout = () => {

    let user=accountService.getUser();
    let roles=user?.roles.includes("ADMIN");;

    useEffect(()=>{
    }, [user])

    return(
    <>
        {user==null ? <PHeader /> : roles ? <AHeader/> : <UHeader/>}
        <div className='container' id='user_body'><Outlet/></div>
        <Footer />
    </>
  )
}

export default ULayout;