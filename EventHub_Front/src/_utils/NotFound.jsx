import { BackButton } from '@components/public/BackButton'
import React from 'react'

import '../_styles/NotFound.css'

export const NotFound = () => {
  return (

    <main className="my-10 container mx-auto">
        <div className="ml-7 my-10">
            <BackButton path={"/"}/>
        </div>
        <h1 id="h1_NotFound" className="text-9xl font-bold text-center my-7">
            Erreur 404
            <span className="text-pink-500">!</span>
        </h1>
        <p className="text-center text-xl">Nous n'arrivons pas à trouver cette page...</p>
    </main>
  )
}
