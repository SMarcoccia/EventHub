import AdminRouter from '@pages/Admin/AdminRouter';
import UserRouter from '@pages/User/UserRouter';
import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthGuard = ({children}) => {
    console.log("children : ", children.type.name);
    const user = JSON.parse(localStorage.getItem("user"))
    
    if(user === null){
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