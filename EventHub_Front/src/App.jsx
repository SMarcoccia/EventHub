import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { PublicRouter } from '@public/PublicRouter'




function App() {


  return (
    <Router>
    <div
     className='flex flex-col justify-between text-gray-900 min-h-screen font-sans bg-blue-50 dark:bg-blue-900'>
     {/* HEADER  */}
      <Header />


      {/* PAGES  */}
      <div className='min-h-full bg-blue-50 dark:bg-blue-900'>
        <PublicRouter/>
      </div>

       {/* FOOTER  */}
       <Footer />
       
    </div>
    </Router>
  )
}

export default App