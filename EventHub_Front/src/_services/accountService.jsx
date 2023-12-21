import jwtDecode from "jwt-decode";

/**
 * Récupération du payload du token :
 * @returns {Object}
 */
const getTokenInfo=()=>{
    return jwtDecode(getToken())
}

/**
 * Récupération du token dans le localStorage :
 * @returns {String}
 */
const getToken=()=>{
    return localStorage.getItem('access-token')
}

/**
 * Sauvegarde du token dans le localStorage :
 * @param {String} token 
 */
const setToken=(token)=>{
    localStorage.setItem('access-token', token);
}

/**
 * Suppression du token du loacalStorage :
 */
const logoutWithToken=()=>{
    localStorage.removeItem('access-token');
}

/**
 * Sauvegarde les informations de l'utilisateur dans le localStorage :
 * @param {Object} response 
 */
const setUser = (response)=>{
    setToken(response.data['access-token']);
    const user={"username":getTokenInfo().sub, "roles":getTokenInfo().scope, "exp":getTokenInfo().exp*1000-Date.now()}
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("isSessionExpired", false)
}

/**
 * Retourne les données de l'utilisateur :
 * @returns {Object}
 */
const getUser = ()=>{
    // .parse() : convertit un JSON en objet javascript.
    return JSON.parse(localStorage.getItem("user"));
}

/**
 * Utilisateur est connecté ?
 * @returns {Boolean}
 */
const isLogged=()=>{
    if(getUser()==null){
        return false
    }
    return true;
}

/**
 * Déconnexion de l'utilisateur :
 */
const logout = ()=>{
    localStorage.clear();
    localStorage.setItem("isSessionExpired", true)
    window.location.reload(false);
}

export const accountService={
    getTokenInfo, getToken, logoutWithToken, setToken, setUser, getUser, logout, isLogged
}
