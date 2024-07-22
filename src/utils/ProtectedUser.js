import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedUser = () => {
    const {user} = useSelector(state => state.auth)
  return (
    user?.role===false ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default ProtectedUser