
const setUser = (user)=>{
    // stringfy convertit un objet en JSON.
    localStorage.setItem("user", JSON.stringify(user));
}

const getUser = ()=>{
    // parse convertit un JSON en objet javascript.
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
