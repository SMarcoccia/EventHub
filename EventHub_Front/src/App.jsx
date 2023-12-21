import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import AdminRouter from '@pages/Admin/AdminRouter'
import UserRouter from '@pages/User/UserRouter'
import AuthRouter from '@pages/Auth/AuthRouter'
import AuthGuard from '@helpers/AuthGuard'
import PublicRouter from '@pages/Public/PublicRouter'
import AuthVerify from '@helpers/AuthVerify'

function App() {

    return (
        <Router>
        <AuthVerify/>
        <div className='text-gray-900 flex flex-col justify-between min-h-screen font-sans bg-blue-50 dark:bg-blue-900'>
            {/* PAGES  */}
            <Routes>
                {/* wildcard (*) permet de dire qu'il y a d'autres routes */}
                <Route path='/*' element={<PublicRouter/>}/>
                <Route path='/admin/*' element={
                    <AuthGuard>
                        <AdminRouter/>
                    </AuthGuard>
                }/>
                <Route path='/user/*' element={
                    <AuthGuard>
                        <UserRouter/>
                    </AuthGuard>
                }/>
                <Route path='/auth/*' element={<AuthRouter/>}/>
            </Routes>
        </div>
        </Router>
  )
}

export default App