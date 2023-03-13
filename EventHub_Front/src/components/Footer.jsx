import React from 'react'

const Footer = () => {
    const date = new Date().getFullYear()
  return (
    <footer className='py-4 bg-gradient-to-r from-blue-300 to-blue-400'>
         <h3
          className='text-lg text-gray-800 font-bold text-center'>
          EventHub - {date} - Copyright</h3>
    </footer>
  )
}

export default Footer