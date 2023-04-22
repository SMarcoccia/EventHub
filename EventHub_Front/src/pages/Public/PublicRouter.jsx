import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Home, Events, EventDetails } from '@public'
import PLayout from './PLayout'
import { NotFound } from '@utils/NotFound'

const PublicRouter = () => {
  return (
    <Routes>
      <Route element={<PLayout/>}>
        <Route index element={<Home />} />
        <Route path='/events' element={<Events />} />
        <Route path='/events/:id' element={<EventDetails />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default PublicRouter;