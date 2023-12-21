import { BackButton } from '@components/public/BackButton'
import { Link } from 'react-router-dom'

const UserHome = () => {
    
    return (
        <main className="my-10 container mx-auto">
            <div className="ml-7 my-10">
                <BackButton path={"/"}/>
            </div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Profil
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-r from-blue-300 to-blue-400 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Bienvenue sur votre page d'acceuil
                </h1>
                <div className="space-y-4 md:space-y-6">
                    <Link to="/user/liste-evenements-utilisateur"> <button className="w-full text-white bg-primary-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">MES EVENEMENTS</button></Link>
                    <Link to="/evenement-favoris"> <button className="w-full text-white bg-primary-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">EVENEMENT FAVORIS</button></Link>
                    <Link to="/editer-le-profil"> <button className="w-full text-white bg-primary-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">MODIFIER PROFIL</button></Link>
                </div>
            </div>
            </div>
            </div>
        </main>
  )
}

export default UserHome