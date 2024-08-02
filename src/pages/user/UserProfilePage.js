import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfileSideBar from "../../components/user/ProfileSideBar";
import Cart from './Cart';
import Orders from './Orders';
import EditProfile from './EditProfile';



const UserProfilePage = () => {
  return (
    <div className="flex">
      <ProfileSideBar />
      <div className="ml-10 p-6 flex-grow">
        <Routes>
            <Route path="cart" element={<Cart/>}/>
            <Route path="orders" element={<Orders/>}/>
            <Route path="editProfile" element={<EditProfile/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default UserProfilePage;