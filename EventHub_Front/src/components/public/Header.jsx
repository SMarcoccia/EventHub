import { useNavigate } from 'react-router-dom'
import { HeaderItem } from './HeaderItem'
import imgLogo from "@img/logo.png";

import { accountService } from "@services/";

import "./header.css"

const Header = ({title = "EventHub"}) => {

    const user=accountService.getUser();
    const navigate = useNavigate()
    const links=[]
    links.push({path: "/", title: "Accueil"})
    if(user !== null){
        links.push({path: "/events", title: "Recherchez"})    
        if (user.role === "USER") {
            links.push({path: "/user/home", title: "Mon compte"})
        }else{
            links.push({path: "/admin/home", title: "Mon compte"})
            links.push({path: "/admin/user/listes-utilisateurs", title: "Liste utilisateurs"})
        }
        links.push({path: "/", title: "Déconnexion"})
    }else{
        links.push({path: "/auth/register", title: "Inscription"})
        links.push({path: "/auth/login", title: "Connexion"})        
    }

    return (
        <header className='flex justify-between items-center bg-gradient-to-r from-blue-300 to-blue-400'>
        {/* LOGO */}
        <div className='container mx-5 justify-between py-5 flex items-center'>
            <div
                onClick={() => navigate('/')}
                className='flex gap-3 items-center cursor-pointer'>
            <img 
                src={imgLogo} 
                alt="logo-EventHub"
                width={40}
                height={40} 
            />
            <h3 className='text-xl font-bold'>{title}</h3>
            </div>

            {/* LIENS */}

            <nav>
            <ul className='flex justify-between gap-10'>
                { 
                    links.map(({title, path}) =>( <HeaderItem key={title} path={path} title={title} />
                ))}
            </ul>
            </nav>
        </div>
    </header>
    )
}

export default Header;

