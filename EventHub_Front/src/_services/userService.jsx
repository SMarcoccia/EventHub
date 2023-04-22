import Axios from "./callerService";

const register=(data)=>{
    return Axios.post("register", data)
}

const login=(data)=>{
    return Axios.post("login", data)
}

export const userService={
    register, login
}