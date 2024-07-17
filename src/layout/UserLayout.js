import React from 'react'
import NavBar from '../components/user/Navbar'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default UserLayout