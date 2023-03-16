import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { UserDetail } from "./UserDetail";

export const Login = () => {
    const [email, setEmail] =useState('');
    const [password, setPassword] =useState('');
    const [error, setError] =useState('');
    const navigate=useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(email == '' && password == ''){
      setError("Champs vide")
    }else{

    axios
    .post('http://localhost:8081/api/login', {email: email, password: password,})
    .then(response => {
      console.log(response.status)
      if(response.data.succes){
        navigate("/user-detail");
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }else{
        setError(response.data.message);
      }
    }).catch(error=>{
      setError(error.response.data.message);
      console.error(error);
    })

    }
    
    

  }
    return (
<section className="bg-blue-50 dark:bg-blue-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          EventHub    
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-r from-blue-300 to-blue-400 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Connectez vous
            </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
                            <input value={email} onChange={(event)=> setEmail(event.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required=""/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                            <input value={password} onChange={(event)=> setPassword(event.target.value)} type="password" name="password" id="password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
      
                        {error && <div className="font-medium text-blue-500 text-xxs">{error}</div>}
      
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Se connecter</button>
                         
                        
                        <p className="text-sm font-bold text-white dark:text-white-400">
                    Pas encore de compte ?<Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to={"/register"}> S'inscrire ici </Link>
                </p>
            </form>
        </div>
        </div>
        </div>
        </section>
    )
  }


  
  