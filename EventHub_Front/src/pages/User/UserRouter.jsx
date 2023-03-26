import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserHome, EditCreateEvent, ListEventsUser, ULayout } from '@user'
import { NotFound } from '@utils/NotFound'


const UserRouter = () => {
  return (
    <Routes>
        <Route element={<ULayout />}>
            <Route index element={<UserHome/>}/>
            <Route path='home' element={<UserHome/>} />
            <Route path='liste-evenements-utilisateur' element={<ListEventsUser/>} />
            <Route path='editer-un-evenement/:id' element={<EditCreateEvent/>} />
            <Route path='creer-un-evenement' element={<EditCreateEvent/>} />
            <Route path='*' element={<NotFound/>} />
        </Route>
    </Routes>
  )
}

export default UserRouter