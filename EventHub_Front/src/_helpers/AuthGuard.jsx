import { accountService } from '@services/accountService'
import { Navigate } from 'react-router-dom'
import React from 'react'

const AuthGuard = ({children}) => {
    const user = accountService.getUser();
    
    if( ! accountService.isLogged()){
        return <Navigate to="/"/>
    }else{
        if (children.type.name === "AdminRouter" && user.role === "USER") {
            return <Navigate to="/"/>
        }else{
            return children;
        }
    }

        
    
}

export default AuthGuard