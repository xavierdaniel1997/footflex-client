import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfileSideBar from "../../components/user/ProfileSideBar";
import Cart from './Cart';
import Orders from './Orders';



const UserProfilePage = () => {
  return (
    <div className="flex">
      <ProfileSideBar />
      <div className="ml-72 p-6 flex-grow">
        <Routes>
            <Route path="cart" element={<Cart/>}/>
            <Route path="orders" element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default UserProfilePage;