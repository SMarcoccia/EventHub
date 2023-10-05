import axios from "axios";
import { accountService } from "./accountService";

const Axios=axios.create({
    baseURL: "http://localhost:8081/api"
})

// Intercepteur pour la mise en place du token dans la requête :
Axios.interceptors.request.use(request=>{
    if(accountService.isLogged()){
        request.headers.Authorization='Bearer'+accountService.getToken();
    }
    return request;
})

// Intercepteur pour vérifier si on a bien le token : 
Axios.interceptors.response.use(response=>{
    return response;
}, error=>{
    if(error.response.status === 401){
        // Attention ici on supprime le user normalement on devrait supprimer le token.
        // Ne devrait ton pas clear le localstorage.
        accountService.logout(); 
        window.location='/auth/login'; // Ici on redirige l'utilisateur et rafraichie la page donc cela nettoie tout le state donc toutes les variables qu'il y a à l'intérieur.
    }else{
        return Promise.reject(error);
    }
})

export default Axios;