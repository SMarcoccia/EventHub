import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PublicRouter from '@public/PublicRouter'
import AdminRouter from '@pages/Admin/AdminRouter'
import UserRouter from '@pages/User/UserRouter'
import AuthRouter from '@pages/Auth/AuthRouter'

function App() {


  return (
    <Router>
    <div className='flex flex-col justify-between text-gray-900 min-h-screen font-sans bg-blue-50 dark:bg-blue-900'>


    {/* PAGES  */}
    <div className='min-h-full bg-blue-50 dark:bg-blue-900'>
        <Routes>
            {/* wildcard (*) permet de dire qu'il y a d'autre route */}
            <Route path='/*' element={<PublicRouter/>}/>
            <Route path='/admin/*' element={<AdminRouter/>}/>
            <Route path='/user/*' element={<UserRouter/>}/>
            <Route path='/auth/*' element={<AuthRouter/>}/>
        </Routes>
    </div>
       
    </div>
    </Router>
  )
}

export default App