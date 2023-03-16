import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Home } from './pages/public/Home'
import { Login } from './pages/public/Login'
import { Events } from './pages/Public/Events'
import { NotFound } from './utils/NotFound'
import { UserDetail } from './pages/User/UserDetail'

import { ListEventsUser } from './pages/user/ListEventsUser'
import { EditCreateEvent } from './pages/User/EditCreateEvent'
import { Register } from './pages/Public/Register'
import { EventDetails } from './pages/Public/EventDetails'


function App() {


  return (
    <Router>
    <div
     className='flex flex-col justify-between text-gray-900 min-h-screen font-sans bg-blue-50 dark:bg-blue-900'>
     {/* HEADER  */}
      <Header />


      {/* PAGES  */}
      <div className='min-h-full bg-blue-50 dark:bg-blue-900'>
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
      </div>

       {/* FOOTER  */}
       <Footer />
       
    </div>
    </Router>
  )
}

export default App