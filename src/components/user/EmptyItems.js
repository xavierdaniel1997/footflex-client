import React from 'react'
import { BsCart3 } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { Link } from 'react-router-dom';

const EmptyItems = ({buttonName, pageName}) => {
  return (
    <div className='flex flex-col items-center justify-center my-10 gap-4'>
        <div>
            {pageName==="cart" ? <BsCart3 size={150} color="gray"/> :  <IoMdHeartEmpty size={150} color="gray"/>}
        </div>
        <Link to="/"><div className='text-center'>
            <p className='mb-4'>Your {pageName} is empty!</p>
            <button className='border border-blue-500 px-4 py-2 text-blue-500 font-semibold transition-colors duration-300 ease-in-out hover:bg-blue-500 hover:text-white'>{buttonName}</button>
        </div>
        </Link>
    </div>
  )
}

export default EmptyItems