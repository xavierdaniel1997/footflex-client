import React, { useState } from 'react'
import {FaPlus} from "react-icons/fa";
import ReusableTable from '../../components/admin/ReusableTable';
import BrandForm from '../../components/admin/BrandComponent/BrandForm';


const BrandPage = () => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div className='flex flex-col'>
      <div className="flex justify-between items-center px-10 py-5 mb-4">
        <div>
          <h1 className="text-2xl font-bold">Popular Brands</h1>
          <nav className="text-gray-600 text-sm">Home &gt; Brand</nav>
        </div>
        <div className="flex items-center">
          <button
            className="bg-black text-white p-2 rounded-md flex items-center"
            onClick={handleClickOpen}
          >
            <span className="mr-2">Add New Brand</span>
            <FaPlus />
          </button>
        </div>
      </div>
      <BrandForm open={open} handleClose={handleClose}/>
    </div>
  )
}

export default BrandPage