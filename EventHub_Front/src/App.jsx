import { useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Events } from './pages/Events'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { UserDetail } from './pages/UserDetail'
import EventDetails from './pages/EventDetails'
import { Logout } from './pages/Logout'
import Signin from './pages/Register'
import Register from './pages/Register'
import { ListEventsUser } from './pages/ListEventsUser'
import { EditCreateEvent } from './pages/EditCreateEvent'


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
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
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