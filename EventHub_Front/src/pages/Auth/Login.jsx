import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

import { BackButton } from "@components/public/BackButton";

import { accountService } from "@services";
import { userService } from "@services";


const Login = () => {

    const timeout=3000;

    const [credentials, setCredentials]=useState({
        username:'',
        password:''
    });

    const onChange=(e)=>{
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const [error, setError] =useState('');
    const navigate=useNavigate();

    const timerMsg=()=>{
        setTimeout(() => {
            setError("")
        }, timeout);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }

        // TODO faire vérif email js et password. Attention on a changer pour le username car on travail dans le back avec
        // Spring Security UserDetailsService.
        if(credentials.username == '' && credentials.password == ''){
            setError("Les champs sont vides");
        }else if(credentials.username == ''){
            setError("Veuillez saisir votre nom");
        }else if(credentials.password == ''){
            setError("Veuillez saisir votre mot de passe");
        }else{
            await userService.login(credentials, config)
            .then(response => {
                if(response){
                    try {
                        accountService.setUser(response); 
                        navigate(accountService.getUser().roles.includes("ADMIN") ? "/admin/home" : "/user/home");
                    } catch (e) {
                        console.log(e);
                    }
                }else{
                    setError(response.data.message);
                }
            }).catch(error=>{
                setError(error);
            })
        }
    }

    return (
        <main>
            <div className="ml-7 my-10">
                <BackButton path={"/"}/>
            </div>
            <div className="flex flex-col flex-nowrap">
                {error && 
                    <div className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{error} {timerMsg()}</span>
                    </div>}
            </div>
            <div className="flex flex-col items-center px-6 py-8 mx-auto  lg:py-0">
            <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            EventHub    
            </div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-r from-blue-300 to-blue-400 dark:border-gray-700">
            <div className="cardLogin mb-8 space-y-4 md:space-y-6 sm:p-8 ">
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                    Connectez vous
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block mb-3 text-sm font-medium">Votre nom d'utilisateur</label>
                        <input value={credentials.username} onChange={onChange} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-3 text-sm font-medium">Mot de passe</label>
                        <input type="password" name="password" id="password" autoComplete="on" value={credentials.password} onChange={onChange} placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>

                    <button type="submit" className="w-full bg-primary-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Se connecter</button>
                    
                    <p className="text-sm font-bold ">
                        Pas encore de compte ?<Link className="font-medium ml-4 text-primary-600 hover:underline dark:text-primary-500" to={"/auth/register"}>   
                        S'inscrire ici </Link>
                    </p>
                </form>
            </div>
            </div>
            </div>
        </main>
    )
  }

  export default Login;