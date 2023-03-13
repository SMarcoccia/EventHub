import React from 'react'
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';

export const UserDetail = () => {
  const user=JSON.parse(localStorage.getItem("user"))
  console.log(user);
  return (
    <div>
    <div className='py-4'>
        <BackButton path={"/"} />
    </div>
    <section className="bg-blue-50 dark:bg-blue-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Profile
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-r from-blue-300 to-blue-400 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Bienvenue sur votre page d'acceuil
            </h1>
            <div className="space-y-4 md:space-y-6">
                <Link to="/events/liste-evenements-utilisateur"> <button className="w-full text-white bg-primary-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">MES EVENEMENTS</button></Link>
                <Link to="/fav-event"> <button className="w-full text-white bg-primary-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">EVENEMENT FAVORIS</button></Link>
                <Link to="/edit-profil"> <button className="w-full text-white bg-primary-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">MODIFIER PROFIL</button></Link>
            </div>
        </div>
        </div>
        </div>
    </section>
    </div>
  )
}