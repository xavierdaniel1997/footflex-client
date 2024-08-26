import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../config/axiosConfig";

export const fetchCartDetails = createAsyncThunk(
  "cart/fetchCartDetails",
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get("/cart/show-cart");
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({productId, size}, {rejectWithValue}) => {
    try {
      const response = await api
        .post("cart/addItem", {
          productId,
          size,
        })
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, {rejectWithValue}) => {
    try {
      await api.delete(`/cart/remove-item/${productId}`);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
); 

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async({productId, size, quantity}, {rejectWithValue}) => {
    try{
      const response = await api.put(`/cart/cart-update/${productId}`, {size, quantity})
      return response.data.cart;
    }catch(error){
      return rejectWithValue(error.response.data.message);
    }
  }
)

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/cart/clear-cart");
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
)

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = {
            ...state.cartItems,
            items: state.cartItems.items.filter(item => item.productId._id !== action.payload)
        };
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = [];
      })
  },
});

export default cartSlice.reducer;
