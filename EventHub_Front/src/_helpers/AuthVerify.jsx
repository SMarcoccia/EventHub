import { accountService } from '@services/accountService';
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthVerify = () => {
    const navigate=useNavigate();
    const flag=useRef(false);
    let user=accountService.getUser();
    const time = user?.exp;

    useEffect(()=>{
        if(accountService.isLogged() && flag.current===false){
            localStorage.setItem("messageSessExpir", "")
            setTimeout(()=>{
                accountService.logout();
                localStorage.setItem("messageSessExpir", "Votre session à expiré !");
                navigate("/")
            }, time)
            return ()=> flag.current=true;
        }
    }, [user]) // Note time ne va pas car si on se déconnecte alors time continue à fonctionner.

    return(
        <></>
    )
}

export default AuthVerify