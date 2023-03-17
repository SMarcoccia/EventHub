import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Home, Login, Events, Register, EventDetails } from '@public'

import { UserDetail } from '@user/UserDetail'
import { ListEventsUser } from '@user/ListEventsUser'
import { EditCreateEvent } from '@user/EditCreateEvent'

import { NotFound } from '@utils/NotFound'

export const PublicRouter = () => {
  return (
    <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/events' element={<Events />} />
        <Route path='/events/:slug' element={<EventDetails />} />
        <Route path='/events/liste-evenements-utilisateur' element={<ListEventsUser/>} />
        <Route path='/events/editer-un-evenement/:id' element={<EditCreateEvent/>} />
        <Route path='/events/creer-un-evenement' element={<EditCreateEvent/>} />
        <Route path='/user-detail' element={<UserDetail />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
