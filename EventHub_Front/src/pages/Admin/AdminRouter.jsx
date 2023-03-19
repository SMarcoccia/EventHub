import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ALayout from './ALayout'
import Dashboard from './Dashboard'


const AdminRouter = () => {
  return (
    <Routes>
        <Route element={<ALayout/>}>
            <Route path='dashboard' element={<Dashboard/>}/>
        </Route>
    </Routes>
  )
}

export default AdminRouter