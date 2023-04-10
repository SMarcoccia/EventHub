
let setUser = (user)=>{
    localStorage.setItem("user", JSON.stringify(user));
}

let getUser = ()=>{
    return JSON.parse(localStorage.getItem("user"));
    
}

let isLogged=()=>{
    let user=getUser();
    return !!user;    
}

let logout = ()=>{
    localStorage.removeItem("user")
}


export const accountService={
    setUser, getUser, logout, isLogged
}
