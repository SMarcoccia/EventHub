import React, { useImperativeHandle } from "react";


const ErrorMsgEmail = (props, ref) => {

    // Regex :
    const emailRegex=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i;
    // Messages : 
    let msg="";
    let msgEmptyEmail="Veuillez saisir votre email"
    let msgEmailExist="Cette email existe déjà";
    let msgNotValidEmail="Cette email n'est pas valide";
    let isValidEmail=false;

    const input = document.querySelector("input[name=email]");

    useImperativeHandle(ref, ()=>({
        isValidEmail(){
            if (isValidEmail) {
                return isValidEmail;
            }
        },
    }));

    // Vérification de la validité de l'email.
    if(input?.value){
        if (input?.value.match(emailRegex)) {
            isValidEmail=true;
            msg="";
            if (props.targetName === "email") {
                input?.setAttribute("style", "border: 2px solid green")
            }else{
                input?.setAttribute("style", "")
            }
        }else{
            isValidEmail=false;
            msg=msgNotValidEmail;
            input?.setAttribute("style", "border: 2px solid red");
        }
    }else if (props.targetName === "email"){
        input?.setAttribute("style", "border: 2px solid green");
    }else{
        input?.setAttribute("style", "");
    }

    // S'il y a un champs vide alors on vérife lequelle c'est, et on envoi le message d'alerte.
    if(props.isEmptyField && ! input?.value){
        msg=msgEmptyEmail;
        input?.setAttribute("style", "border: 2px solid red");
    }else if (isValidEmail) {
        if(props.messageError && props.messageError === input?.value){
            msg=msgEmailExist
            input?.setAttribute("style", "border: 2px solid red");
        }else{
            msg="";
        } 
    }

    return (
        <div>
            {msg && <span>{msg}</span>}
        </div>
            
    )
}

export default React.forwardRef(ErrorMsgEmail)