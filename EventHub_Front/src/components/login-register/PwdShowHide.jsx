import React, { useEffect, useRef, useState } from 'react'

import pwdEyeHide from "@img/pwd-eye-hide.png";
import pwdEyeShow from "@img/pwd-eye-show.png";

import "../../_styles/PwdShowHide.css"

const PwdShowHide = (props) => {
    let msgPwdEyeHide="Cachez le mot de passe";
    let msgPwdEyeShow="Afficher le mot de passe";
    let eyeShow="eyeShow";
    let eyeHide="eyeHide"

    const imgRef=useRef(null);

    const handleClick = (e) => {
        if (e.target.className === eyeShow) {
            imgRef.current.src=pwdEyeHide;
            imgRef.current.className=eyeHide;
            imgRef.current.alt=msgPwdEyeHide;

            if(props.inputPwdRef)
            {
                props.inputPwdRef.current.type="text";
            }else{
                props.inputConfirmPwdRef.current.type="text";
            }
        }else{
            imgRef.current.src=pwdEyeShow;
            imgRef.current.className=eyeShow;
            imgRef.current.alt=msgPwdEyeShow;
            if(props.inputPwdRef)
            {
                props.inputPwdRef.current.type="password";
            }else{
                props.inputConfirmPwdRef.current.type="password";
            }
        }

        if(props?.inputPwdRef?.current?.name==="password") {
            props.inputPwdRef.current.focus();
        }
        if(props?.inputConfirmPwdRef?.current?.name==="confirmPassword"){
            props.inputConfirmPwdRef.current.focus();
        }

    };

    useEffect(()=>{
        
        imgRef.current?.addEventListener("click", handleClick);

        return ()=>{
            imgRef.current?.removeEventListener("click", handleClick);
        }
    }, [])

    return (
        <div className='imgShowHide'>
            <img ref={imgRef} className={eyeShow} src={pwdEyeShow} alt={msgPwdEyeShow}/>
                    </div>
    )
}

export default PwdShowHide