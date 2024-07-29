import React from 'react'
import NavBar from '../components/user/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/user/Footer'

const UserLayout = () => {
  return (
    <div>
        <NavBar/>
        <div className='py-28 px-20'>
        <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default UserLayout