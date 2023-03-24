import { useNavigate } from 'react-router-dom'
import { HeaderItem } from './HeaderItem'

import "./header.css"

export const Header = ({title = "EventHub"}) => {
    const user=JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    const links=[]
    
    if(user !== null){
        links.push({path: "/", title: "Accueil"})
        links.push({path: "/user/home", title: "Mon compte"})
        links.push({path: "/", title: "Déconnexion"})
    }else{
        links.push({path: "/register", title: "Inscription"})
        links.push({path: "/login", title: "Connexion"})        
    }

return (
    <header className='flex justify-between items-center bg-gradient-to-r from-blue-300 to-blue-400'>
    {/* LOGO */}
    <div className='container mx-5 justify-between py-5 flex items-center'>
        <div
            onClick={() => navigate('/')}
            className='flex gap-3 items-center cursor-pointer'>
        <img 
            src="../../public/img/logo.png" 
            alt="logo EventHub"
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

