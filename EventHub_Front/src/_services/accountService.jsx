
const setUser = (user)=>{
    localStorage.setItem("user", JSON.stringify(user));
}

const getUser = ()=>{
    return JSON.parse(localStorage.getItem("user"));
    
}

const isLogged=()=>{
    let user=getUser();
    return !!user;    
}

const logout = ()=>{
    localStorage.removeItem("user")
}


export const accountService={
    setUser, getUser, logout, isLogged
}
