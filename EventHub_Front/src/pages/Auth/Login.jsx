import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

import { BackButton } from "@components/public/BackButton";

import { accountService } from "@services";
import { userService } from "@services";


const Login = () => {
    const [credentials, setCredentials]=useState({
        email:'',
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO faire vérif email js et password.
        if(credentials.email == '' && credentials.password == ''){
            setError("Champs vide")
        }else{
            await userService.login(credentials)
            .then(response => {
                if(response.data.success){
                    try {
                        // Convertit le JSON request en JSON object Javascript, car le JSON request n'est pas reconnue comme un JSON Object Javascript et stocké dans le localstorage.
                        accountService.setUser(response.data.user);
                        navigate(response.data.user.role === "USER" ? "/user/home" : "/admin/home");
                    } catch (e) {
                        console.log(e);
                    }
                }else{
                    setError(response.data.message);
                }
            }).catch(error=>{
                console.log(error);
                setError(error.response.data.message);
            })
        }
    }

    return (
        <main>
            <div className="ml-7 my-10">
                <BackButton path={"/"}/>
            </div>
            <div className="flex flex-col items-center px-6 py-8 mx-auto  lg:py-0">
            <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            EventHub    
            </div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-r from-blue-300 to-blue-400 dark:border-gray-700">
            <div className="mb-8 space-y-4 md:space-y-6 sm:p-8 ">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Connectez vous
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
                        <input value={credentials.email} onChange={onChange} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                        <input value={credentials.password} onChange={onChange} type="password" name="password" id="password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>

                    {error && <div className="font-medium text-blue-500 text-xxs">{error}</div>}

                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-purple-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Se connecter</button>
                    
                    <p className="text-sm font-bold text-white dark:text-white-400">
                        Pas encore de compte ?<Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to={"/auth/register"}> S'inscrire ici </Link>
                    </p>
                </form>
            </div>
            </div>
            </div>
        </main>
    )
  }

  export default Login;