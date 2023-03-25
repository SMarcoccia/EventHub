import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ALayout from './ALayout'
import Dashboard from './AdminHome'
import { ListUsers } from '@admin/User'
import { NotFound } from '@utils/NotFound'




const AdminRouter = () => {
  return (
    <Routes>
        <Route element={<ALayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='home' element={<Dashboard/>}/>
            <Route path='user'>
              	<Route path='listes-utilisateurs' element={<ListUsers/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Route>
    </Routes>
  )
}

export default AdminRouter