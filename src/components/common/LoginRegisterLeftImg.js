import React from 'react'
import { Link } from 'react-router-dom'

const LoginRegisterLeftImg = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gray-200 items-center justify-center">
        <div className="relative w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Footflex shoe"
            className="object-cover w-full h-full"
          />
          <div className="absolute top-8 left-8 text-white font-bold">
           <Link to="/"><p> &gt; HOME</p></Link> 
          </div>
        </div>
      </div>
  )
}

export default LoginRegisterLeftImg