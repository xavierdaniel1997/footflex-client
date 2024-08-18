import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../config/axiosConfig";

export const fetchWishList = createAsyncThunk(
  "wishList/fetchWishList", 
  async () => {
    const response = await api.get("wishList/showItems");
    return response.data.wishList.products;
  }
);

export const addItemToWishList = createAsyncThunk(
  "wishList/addItemToWishList",
  async (productId) => {
    const response = await api.post("wishList/addtoWishList", {productId});
    return response.data.wishList.products;
  }
);

export const removeItemFromWishList = createAsyncThunk(
  "wishList/removeItemFromWishList",
  async (productId) => {
    const response = await api.delete(`wishList/removeItem/${productId}`);
    return productId;
  }
);

const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addItemToWishList.fulfilled, (state, action) => {
        console.log("additemtowishlist item with ID:", action.payload);
        state.items.push(action.payload);
        // state.items = action.payload;
      })
      .addCase(removeItemFromWishList.fulfilled, (state, action) => {
        const removedItemId = action.payload;
        console.log("Removing item with ID: state.items ", state.items);
        state.items = state.items.filter((item) => item._id !== removedItemId);
      });
  },
});

export default wishListSlice.reducer;
