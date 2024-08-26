import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categoryReducer from "./categorySlice";
import wishListReducer from "./wishListSlice";
import cartReducer from "./cartSlice";
import addressReducer from "./selectedAddressSlice";
import couponsReducer from "./couponSlice"


const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        wishList : wishListReducer,
        cart: cartReducer,
        address: addressReducer,
        coupons: couponsReducer
    }
})
export default store;