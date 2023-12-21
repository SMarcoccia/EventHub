import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

import { BackButton } from '@components/public/BackButton';

import { userService } from '@services';

import '../../_styles/Register.css'

import ErrorMsgName from '@components/login-register/ErrorMsgName';
import ErrorMsgEmail from '@components/login-register/ErrorMsgEmail';
import ErrorMsgPassword from '@components/login-register/ErrorMsgPassword';
import PwdShowHide from '@components/login-register/PwdShowHide';

const Register= () => {

    let inputAll=null;
    const emailRef=useRef(null);
    const pwdRef=useRef(null);
    const inputPwdRef=useRef(null);
    const inputConfirmPwdRef=useRef(null);
    // Si au moins un champs du formulaire est vide et que l'on a cliqué on n'envoi pas la requête.
    const [isEmptyField, setIsEmptyField]=useState(false);
    //const isEmptyFieldRef=useRef(false);
    const [targetName, setTargetName]=useState("");
    // On désactive le bouton d'envoi du formulaire après le premier click sur le boutton d'envoi.
    const [isDisabledBtn, setIsDisabledBtn]=useState(false);
    const [message, setMessage] = useState("");
    // Si la réponse renvoi une erreur on récupère les valeurs des champs. S'il n'y a pas de valeur alors le champs saisie est valide.
    const [messageError, setMessageError] = useState({
        username:"",
        pseudo:"",
        email:"",
    });
    const [formInput, setFormInput]=useState({
        username:"",
        firstname:"",
        pseudo:"",
        email:"",
        password:"",
        confirmPassword:"",
    })

    const onChange=(e)=>{
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value
        })
    }

    // Si on est enregistré un message d'erreur apparait. Puis redirigé vers login.
    const setTimeoutThen=()=>{
        setTimeout(() => {
            setMessage("");
            message == ""  ? window.location.href = '/auth/login' : ""; 
        }, 3000);
    }
    
    const config = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }

    const handleSubmit = async (event) => {
        console.log("\n");
        console.log(">>>>>>>>>>>>>>> register handlSubmit");
        event.preventDefault();

        // Si un champ est vide on n'envoi pas la requête.
        for (const [key, value] of Object.entries(formInput)){
            if (value==="") {
                setIsEmptyField(true);
                return;
            }
        }

        // TODO : 
            // - une validation de password, pas d'espace ni de caractère unicode.
            // - display password,
            // - une validation du firstname, 
            // - une validation du lastname, 
            // - envoyer un mail de confirmation,
        // Si l'on à pas encore cliquer sur le boutton.
        if( ! isDisabledBtn && emailRef.current.isValidEmail() && pwdRef.current.isValidPassword() && pwdRef.current.isIdenticalsPasswords()){
            // Si les champs sont remplis et les mots de passes sont identiques et l'email est valide, on envoi la requête.
            //if(  && ref.current.isIdenticalsPasswords()){
            await userService.register(formInput, config)
            .then(response => {
                if(response.data.success){
                    setMessage(response.data.message);
                    window.scrollTo(0, 0); // Pour revenir en haut de page.
                    setIsDisabledBtn(true);
                    setTimeoutThen();
                }
            }).catch(error=>{
                setMessageError(error.response.data.message);
            })
        }
        console.log("<<<<<<<<<<<<<<< register handlSubmit");
        console.log("\n");
    }

    useEffect(()=>{
        inputAll=document.querySelectorAll("input");
        for (let i = 0; i < inputAll?.length; i++) {
            inputAll[i]?.addEventListener("focus", (e)=>{
                setTargetName(e.target.name);
            });
        }
    },[targetName])


    return (
        <section className="bg-blue-50 dark:bg-blue-900">
        <div className="ml-7 my-10">
            <BackButton path={"/"}/>
        </div>
        {
            message &&  
            <div  className="flex flex-col flex-nowrap">
                    <div className="text-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{message}</span>
                    </div>
            </div>
        }

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                EventHub    
            </div>
            <div className="cardRegister w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gradient-to-r from-blue-300 to-blue-400 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                        Créer votre compte 
                    </h1>
                    <form className="space-y-4 " onSubmit={handleSubmit}>
                        <div>
                            <label htlmfor="username" className="block mb-2 text-sm font-medium">Nom:<span className='start'>*</span></label>
                            <input type="text" name="username" id="username" value={formInput.username} onChange={onChange} className="bg-gray-50 border mb-2 border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required=""/>
                            <ErrorMsgName name={"username"} messageError={messageError.username} nameFr={"nom"} isEmptyField={isEmptyField} targetName={targetName}/>
                        </div>
                        <div>
                            <label htlmfor="firstname" className="block mb-2 text-sm font-medium">Prénom:<span className='start'>*</span></label>
                            <input type="text" name="firstname" id="firstname" value={formInput.firstname} onChange={onChange}  className="bg-gray-50 border mb-2 border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required=""/>
                            <ErrorMsgName name={"firstname"} nameFr={"prénom"} isEmptyField={isEmptyField} targetName={targetName}/>
                        </div>
                        <div>
                            <label htlmfor="pseudo" className="block mb-2 text-sm font-medium">Pseudo:<span className='start'>*</span></label>
                            <input type="text" name="pseudo" id="pseudo" value={formInput.pseudo} onChange={onChange}  className="bg-gray-50 border mb-2 border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required=""/>
                            <ErrorMsgName name={"pseudo"} messageError={messageError.pseudo} nameFr={"pseudo"} isEmptyField={isEmptyField} targetName={targetName}/>
                        </div>
                        <div>
                            <label htlmfor="email" className="block mb-2 text-sm font-medium">Email:<span className='start'>*</span></label>
                            <input type="email" name="email" id="email" value={formInput.email} onChange={onChange}  className="bg-gray-50 border mb-2 border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required=""/>
                            <ErrorMsgEmail name={"email"} messageError={messageError.email} isEmptyField={isEmptyField} ref={emailRef} targetName={targetName}/>
                        </div>
                        <div className='password'>
                            <label htlmfor="password" className="block mb-2 text-sm font-medium">Mot de passe:<span className='start'>*</span></label>
                            <input ref={inputPwdRef} type="password" name="password" autoComplete="on" value={formInput.password} onChange={onChange} id="password" placeholder="" className="bg-gray-50 border mb-2 border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                            <ErrorMsgPassword name={"password"} isEmptyField={isEmptyField} targetName={targetName} ref={pwdRef}/>
                            <PwdShowHide inputPwdRef={inputPwdRef}/>
                        </div>
                        <div className='confirmPassword'>
                            <label htlmfor="confirmPassword" className="block mb-2 text-sm font-medium">Confirmer le mot de passe: <span className='start'>*</span></label>
                            <input ref={inputConfirmPwdRef} type="password" name="confirmPassword" autoComplete="on" value={formInput.confirmPassword} onChange={onChange} id="confirmPassword" placeholder="" className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                            <ErrorMsgPassword name={"confirmPassword"} isEmptyField={isEmptyField} targetName={targetName}/> 
                            <PwdShowHide inputConfirmPwdRef={inputConfirmPwdRef}/>
                        </div>
                        <button type="submit" disabled={isDisabledBtn} className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Créer mon compte</button>
                        <p className="text-sm font-bold dark:text-white-400">
                            Vous avez deja un compte ? <Link className="font-medium ml-4 text-primary-600 hover:underline dark:text-primary-500" to={"/auth/login"}> Connectez vous ici </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Register;
