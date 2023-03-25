import React from 'react'

const AdminHome = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <div>Bienvenue {user.pseudo}</div>
    )
}

export default AdminHome