import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categoryReducer from "./categorySlice";
import wishListReducer from "./wishListSlice";
import cartReducer from "./cartSlice";
import addressReducer from "./selectedAddressSlice"


const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
        wishList : wishListReducer,
        cart: cartReducer,
        address: addressReducer,
    }
})
export default store;