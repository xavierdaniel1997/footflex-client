import React from "react";
import {Routes, Route} from "react-router-dom";
import ProfileSideBar from "../../components/user/ProfileSideBar";
import Orders from "./Orders";
import EditProfile from "./EditProfile";
import DeliveryDetails from "./DeliveryDetails";
import WishList from "./WishList";
import CartPage from "./CartPage";

const UserProfilePage = () => {
  return (
    <div className="flex justify-center mt-9">
      <div className="flex justify-center gap-10 w-full mx-12">
        <div>
          <ProfileSideBar />
        </div>

        <div className="flex-grow">
          <Routes>
            {/* Orders & Credits */}
            <Route path="cart" element={<CartPage />} />
            <Route path="orders" element={<Orders />} />
            <Route path="wishlist" element={<WishList inUserProfile={true}/>} />
            {/* profile */}
            <Route path="" element={<EditProfile />} />
            <Route
              path="address"
              element={<DeliveryDetails inUserProfile={true} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
