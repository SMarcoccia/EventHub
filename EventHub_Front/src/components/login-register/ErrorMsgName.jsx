import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'

const ErrorMsgName = (props, ref) => {

    // Regex :
    //  to match at least five alphanumerics and the underscore, to have at least one letter, to match zero to any occurrence of the given numbers range
    const pseudoRegex=/^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
    const nameRegex=/^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){2,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/;
    // Messages :
    let msg="";
    let msgValidInput="Ce "+props.nameFr+" n'est pas valide";
    let isValidNames=false;
    let msgValueExist="Ce "+props.nameFr+" existe déjà";
    let input=document.querySelector("input[name="+props.name+"]");
    
    useImperativeHandle(ref, () => ({
        isValidNames(){
            if(isValidNames){
                return isValidNames;
            }
        },
    }));

    const checkValidityName=(name)=>{
        if(name) {
            if(name.trim().match(props.name==="pseudo" ? pseudoRegex : nameRegex)){
                isValidNames=true;
                msg="";
                input?.setAttribute("style", "border: 2px solid green");
            }else{
                isValidNames=false;
                msg=msgValidInput;
                input?.setAttribute("style", "border: 2px solid red");
            }
            if (props.targetName !== props.name) {
                input?.setAttribute("style", "");
            }
        }
    }

    // inputs du formulaire :
    // S'il y a un champs vide alors on vérife lequel c'est, et on envoi le message d'alerte.
    if(props.isEmptyField){
        if( ! input?.value){
            input?.setAttribute("style", "border: 2px solid red");
            msg="Veuillez saisir votre "+props.nameFr;
        }else{
            input?.setAttribute("style", "border: 2px solid green");
            // Si l'input n'a plus le focus :
            if (props.targetName !== props.name) {
                input?.setAttribute("style", "");
            }
        }
    }

    checkValidityName(input?.value);

    // Si les noms existe déjà.
    if(props.messageError) {
        if (input?.value && props.messageError === input?.value) {
            input?.setAttribute("style", "border: 2px solid red");
            msg=msgValueExist;
        }else if(props.targetName === props.name){
            input?.setAttribute("style", "border: 2px solid green");
            msg='';
        }else{
            input?.setAttribute("style", "");
            msg='';
        }
    }  
    
    return (
        <div>
            {msg ? <span>{msg}</span> : ""}
        </div>
    )
}
export default React.forwardRef(ErrorMsgName);

