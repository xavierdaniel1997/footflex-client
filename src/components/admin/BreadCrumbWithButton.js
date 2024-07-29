import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const BreadCrumbWithButton = ({componentLocation, location, goback, buttonName, buttonNavigate, noButton}) => {
  return (
    <div className="flex justify-between items-center px-10 py-5 mb-4">
        <div>
          <h1 className="text-2xl font-bold">{componentLocation}</h1>
          <Link to={goback}><nav className="text-gray-600 text-sm">{location}</nav></Link>
        </div>
        <div className="flex items-center">
          {noButton && <button
            className="bg-black text-white p-2 rounded-md flex items-center"
            onClick={buttonNavigate}
          >
            <span className="mr-2">{buttonName}</span>
            <FaPlus />
          </button>}
        </div>
      </div>
  )
}

export default BreadCrumbWithButton