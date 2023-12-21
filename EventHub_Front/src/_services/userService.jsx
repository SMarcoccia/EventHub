import Axios from "./callerService";

const register=(data)=>{
    return Axios.post("auth/register", data)
}

const login=(data, config)=>{
    return Axios.post("auth/login", data, config)
}

export const userService={
    register, login
}