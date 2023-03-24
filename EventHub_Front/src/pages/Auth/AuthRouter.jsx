import { NotFound } from '@utils/NotFound'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Register } from "@auth";
import AuLayout from './AuLayout';

const AuthRouter = () => {
  return (
    <Routes>
        <Route element={<AuLayout/>}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound/>} />
        </Route>
    </Routes>
  )
}

export default AuthRouter