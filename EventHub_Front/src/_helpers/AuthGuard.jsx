import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthGuard = ({children}) => {
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        user === null || user.role !== "ADMIN" ? <Navigate to="/"/> : children
    )
}

export default AuthGuard