
let setUser = (user)=>{
    return localStorage.setItem("user", JSON.stringify(user));
}

let getUser = ()=>{
    return JSON.parse(localStorage.getItem("user"));
}

export const accountService={
    setUser, getUser
}
