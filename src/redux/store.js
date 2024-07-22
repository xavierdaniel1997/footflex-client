import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categoryReducer from "./categorySlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        category: categoryReducer,
    }
})
export default store;