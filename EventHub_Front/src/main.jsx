import React from 'react'
import ReactDOM from 'react-dom/client'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from "react-query/devtools"

import App from './App'
import './index.css'

const queryClient=new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // Si on revient sur la fenêtre cela ne relance pas axios.
            refetchOnMount: false, // Au montage du composant on ne le relance pas.
            refetchOnReconnect: false, // A la reconnection réseau on ne relance pas.
            retry: false, // Pas de réessayé.
            staleTime: 5*60*1000, // Requête valable pendant 5*60*1000 miliseconde.
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </React.StrictMode>,
)
