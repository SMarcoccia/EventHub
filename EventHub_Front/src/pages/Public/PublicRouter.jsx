import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Home, Login, Events, Register, EventDetails } from '@public'

import { NotFound } from '@utils/NotFound'
import PLayout from './PLayout'

const PublicRouter = () => {
  return (
    <Routes>
        <Route element={<PLayout/>}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/events' element={<Events />} />
          <Route path='/events/:slug' element={<EventDetails />} />
          <Route path='*' element={<NotFound />} />
        </Route>
    </Routes>
  )
}

export default PublicRouter;