import { accountService } from '@services/accountService'
import { Navigate } from 'react-router-dom'

const AuthGuard = ({children}) => {

    const user = accountService.getUser();
    if( ! accountService.isLogged()){
        return <Navigate to="/"/>
    }else{
        if (children.type.name === "AdminRouter" && user.roles === "USER") {
            return <Navigate to="/"/>
        }else{
            return children;
        }
    }
}

export default AuthGuard