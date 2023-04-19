import { BackButton } from '@components/public/BackButton';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Register= () => {

    const [error, setError] = useState("");
    const [credentials, setCredentials]=useState({
        pseudo:"",
        name:"",
        lastname:"",
        email:"",
        password:"",
    })


    const onChange=(e)=>{
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        axios
        .post('http://localhost:8081/api/register', credentials)
        .then(response => {
            if(response.data.success){
                //setError(response.data.message);
                window.location.href = '/auth/login';
            }else{
                setError(response.data.message);
            }
        
        }).catch(error=>{
            setError(error.response.data.message);
        })
    }


  return (
    <section className="bg-blue-50 dark:bg-blue-900">
    <div className="ml-7 my-10">
        <BackButton path={"/"}/>
    </div>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            EventHub    
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-r from-blue-300 to-blue-400 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Créer votre compte
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htlmfor="pseudo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pseudo</label>
                        <input type="text" name="pseudo" id="pseudo" value={credentials.pseudo} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required=""/>
                    </div>
                    <div>
                        <label htlmfor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                        <input type="text" name="lastname" id="lastname" value={credentials.lastname} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required=""/>
                    </div>
                    <div>
                        <label htlmfor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prenom</label>
                        <input type="text" name="name" id="name" value={credentials.name} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required=""/>
                    </div>
                    <div>
                        <label htlmfor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" name="email" id="email" value={credentials.email} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required=""/>
                    </div>
                    <div>
                        <label htlmfor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                        <input type="password" name="password" value={credentials.password} onChange={onChange} id="password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>

                    {error && <div className="font-medium text-blue-500 text-xxs">{error}</div>}
                    
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Créer mon compte</button>
                    <p className="text-sm font-bold text-white dark:text-white-400">
                        Vous avez deja un compte ? <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to={"/auth/login"}> Connectez vous ici </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>
  )
}

export default Register;
