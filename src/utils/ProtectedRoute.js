// src/components/ProtectedRoute.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import api from '../config/axiosConfig';
import { setUser } from '../redux/authSlice';
import { toast, Toaster } from 'react-hot-toast';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  useEffect(() => { 
    const validateUser = async () => {
      try {
        const response = await api.get("users/verify");
        dispatch(setUser(response.data.user));
        console.log("from prt", status)
      } catch (error) {
        console.error("Token validation failed", error);
        dispatch(setUser(null));
        if (error.response) {
          toast.error(error.response.data.message || "Session expired. Please log in again.");
        } 
      } 
    };

    if(status === "idle"){
      validateUser();
    }
  }, []);

  return isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
};

export default ProtectedRoute;
