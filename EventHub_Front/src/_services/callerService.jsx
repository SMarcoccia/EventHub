import axios from "axios";
import { accountService } from "./accountService";

const Axios=axios.create({
    baseURL: "http://localhost:8081/"
})

// Intercepteur pour la mise en place du token dans la requête :
Axios.interceptors.request.use(request=>{
    if(accountService.isLogged()){
        request.headers.Authorization='Bearer '+accountService.getToken();
    }
    return request;
})

// Intercepteur pour vérifier si on a bien le token :
Axios.interceptors.response.use(response=>{
    return response;
}, error=>{
    if(error.response?.status === 401){
        // Si on cherche à s'enregistré.
        if (error.response.config.url === "auth/register") {
            console.log("error url  : ", error);
            return Promise.reject(error);
        }
        return Promise.reject("Nom d'utilisateur ou mot de passe incorrect");
    }else{
        return Promise.reject(error);
    }
})

export default Axios;