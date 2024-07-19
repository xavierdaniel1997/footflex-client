import React from "react";
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedAdmin = () => {
  const {user} = useSelector((state) => state.auth);
  return user.role === true ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedAdmin;
