
/**
 * Récupération du payload du token :
 * @returns {Object}
 */
const getTokenInfo=()=>{
    return jwt_decode(getToken())
}

/**
 * Récupération du token dans le localStorage :
 * @returns {String}
 */
const getToken=()=>{
    return localStorage.getItem('token')
}

/**
 * Sauvegarde du token dans le localStorage :
 * @param {String} token 
 */
const saveToken=(token)=>{
    localStorage.setItem('token', token)
}

/**
 * Suppression du token du loacalStorage :
 */
const logoutWithToken=()=>{
    localStorage.removeItem('token');
}

/**
 * Sauvegarde de l'utilisateur dans le localStorage :
 * @param {Object} user 
 */
const setUser = (user)=>{
    // stringfy convertit un objet en JSON.
    localStorage.setItem("user", JSON.stringify(user));
}

/**
 * Retourne les données de l'utilisateur :
 * @returns {Object}
 */
const getUser = ()=>{
    // parse convertit un JSON en objet javascript.
    return JSON.parse(localStorage.getItem("user"));
    
}

/**
 * Utilisateur est connecté ?
 * @returns {Boolean}
 */
const isLogged=()=>{
    let user=getUser();
    return !!user;    
}

/**
 * Déconnexion de l'utilisateur :
 */
const logout = ()=>{
    localStorage.removeItem("user")
}

export const accountService={
    getTokenInfo, getToken, logoutWithToken, saveToken, setUser, getUser, logout, isLogged
}
