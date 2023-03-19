import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Footer } from '@components/public/Footer'
import { Header } from '@components/Header'
import { PublicRouter } from '@public/PublicRouter'
import AdminRouter from '@pages/Admin/AdminRouter'




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
            {/* wildcard (*) permet de dire qu'il y a d'autre route */}
            <Route path='/*' element={<PublicRouter/>}/>
            <Route path='/admin/*' element={<AdminRouter/>}/>
        </Routes>
    </div>

    {/* FOOTER  */}
    <Footer />
       
    </div>
    </Router>
  )
}

export default App