import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ALayout from './ALayout'
import { ListUsers } from '@admin/User'
import { NotFound } from '@utils/NotFound'
import AdminHome from './AdminHome'

const AdminRouter = () => {
  return (
    <Routes>
        <Route element={<ALayout/>}>
            <Route index element={<AdminHome/>}/>
            <Route path='home' element={<AdminHome/>}/>
            <Route path='user'>
              	<Route path='listes-utilisateurs' element={<ListUsers/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Route>
    </Routes>
  )
}

export default AdminRouter