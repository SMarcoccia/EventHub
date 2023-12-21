import React, { useEffect, useImperativeHandle, useRef } from 'react'

//let isValidPassword=false;

const ErrorMsgPassword = (props, ref) => {
    // Accepte 8 à 18 charactère : au moins 1 uppercase, 1 lowercase, 1 caractère spécial (!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]), 1 chiffre.
    const pwdRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{8,18}$/;
    let msg="";
    let msgConfirmPwd="";
    let msgEmptyPwd="Veuillez saisir votre mot de passe";
    let msgEmptyConfirmPwd="Veuillez confirmer votre mot de passe";
    let msgInvalidPwd="Le mot de passe n'est pas valide";
    let isValidPassword=false;
    let isIdenticalsPasswords=false;

    
    // CSS border
    let borderRed="border: 2px solid red";
    let borderGreen="border: 2px solid green";
    
    const inputPwd = document.querySelector("input[name=password]");
    const inputPwdConfirm = document.querySelector("input[name=confirmPassword]");
    
    useImperativeHandle(ref, ()=>({
        isIdenticalsPasswords() {
            return isIdenticalsPasswords;
        },
        isValidPassword(){
            if(isValidPassword) {
                return isValidPassword;
            }
        }
    }));

    // Vérifie si le password et valide :
    const validPwd=(pwd)=>{
        if (pwd != undefined) {
            if(pwd.match(pwdRegex) ) {
                return true;
            }else {
                return false;
            }
        }
    }
    
    // Si pwd et focus ok et que confpwd est vide alors vert
    const validPassword=()=>{
        console.log(">>> validPassword");
        if (props.name==="password" && inputPwd?.value) {
            console.log("if");
            if(validPwd(inputPwd?.value)){
                console.log("if if");
                props.targetName === "password" ? inputPwd?.setAttribute("style", borderGreen) : inputPwd?.setAttribute("style", "");
                isValidPassword=true;
                return true;
            }else{
                console.log("if else");
                inputPwd?.setAttribute("style", borderRed);
                isValidPassword=false;
                return false;
            }
        }else if(props.targetName === "password"){
            console.log("else if");
            inputPwd?.setAttribute("style", borderGreen)
        }else{
            console.log("else");
            inputPwd?.setAttribute("style", "")
        }
        console.log("<<< validPassword");
    }

    const identicalPasswords=()=>{
        return inputPwdConfirm?.value === inputPwd?.value ? true : false;
    }

    const comparePasswords=()=>{
        if (inputPwd?.value && inputPwdConfirm?.value) {
            if(identicalPasswords()){
                msgConfirmPwd="";
                props.targetName === "confirmPassword" ? inputPwdConfirm?.setAttribute("style", borderGreen) : inputPwdConfirm?.setAttribute("style", "");
                isIdenticalsPasswords=true;
            }else{
                inputPwdConfirm?.setAttribute("style", borderRed);
                msgConfirmPwd="Les mots de passes ne correspondent pas !";
                isIdenticalsPasswords=false;
            }
        }else{
            console.log("comparePasswords else");
            props.targetName === "confirmPassword" ? inputPwdConfirm?.setAttribute("style", borderGreen) : inputPwdConfirm?.setAttribute("style", "");
        }
    }

    comparePasswords();
    // Si un champ est vide lorsqu'on a cliqué?
    console.log("props.isEmptyField : ", props.isEmptyField);
    if(props.isEmptyField){
        if(props.name==="password"){
            // On vérifie si c'est le champ password qui est vide.
            if( ! inputPwd?.value) {
                console.log("dans if(props.isEmptyField) dans if if ");
                inputPwd?.setAttribute("style", borderRed);
                msg=msgEmptyPwd;
            }else{
                msg=""
            }
        }
        if(props.name==="confirmPassword" && ! inputPwdConfirm?.value) {
            inputPwdConfirm?.setAttribute("style", borderRed);
            msg=msgEmptyConfirmPwd
        }
    }

    if (props.name==="password") {
        // Verifie la validité du password :
        console.log("dans if (props.name===password) props.isEmptyField : ", props.isEmptyField);
        if(inputPwd?.value){
            ! validPassword() ? msg=msgInvalidPwd : msg="";
        }else if( ! props.isEmptyField && props.targetName === "password"){
            inputPwd?.setAttribute("style", borderGreen);
        }else if(props.isEmptyField){
            console.log("if (props.name===password) if-else if-else");
            inputPwd?.setAttribute("style", borderRed);
        }else{
            console.log("if (props.name===password) else");
            inputPwd?.setAttribute("style", "");
        }
    }else if(props.name==="confirmPassword"){
        if(inputPwdConfirm?.value){
            msg=msgConfirmPwd;
        }
    }

    return (
        <div>
            { msg && <span>{msg}</span>}
            {console.log("<<<<<<<<<<<<<< ErrorMsgPassword")}
            {console.log("\n")}
        </div>
    )
}

export default React.forwardRef(ErrorMsgPassword)