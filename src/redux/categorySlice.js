import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../config/axiosConfig";

export const getCategoryItems = createAsyncThunk(
  "category/getCategoryItems",
  async () => {
    const response = await api.get("category/getCategorys");
    return response.data.categoryData;
  }
);

export const addCategoryItem = createAsyncThunk(
  "category/addCategoryItem",
  async (newCategory, {rejectWithValue}) => {
    try {
      const response = await api.post("category/createCategory", newCategory);
      return response.data.categoryData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message || "An unexpected error occurred",
        }
      );
    }
  }
);

export const updateCategoryItem = createAsyncThunk(
  "category/updateCategoryItem",
  async (updatedCategory, {rejectWithValue}) => {
    try {
      const response = await api.put(
        `category/updateCategory/${updatedCategory._id}`,
        updatedCategory
      );
      return response.data.categoryData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message || "An unexpected error occurred",
        }
      );
    }
  }
);

export const deleteCategoryItem = createAsyncThunk(
  "category/deleteCategoryItem",
  async (id) => {
    await api.delete(`category/deleteCategory/${id}`);
    return id;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isLoading: false,
    error: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategoryItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getCategoryItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // add category
      .addCase(addCategoryItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCategoryItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.push(action.payload)
      })
      .addCase(addCategoryItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message
      })
      // update category
      .addCase(updateCategoryItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCategoryItem.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.categories.findIndex(
          (category) => category._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategoryItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      // delete category
      .addCase(deleteCategoryItem.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload
        );
      })

      
  },
});

export const {addCategoryItems} = categorySlice.actions;
export default categorySlice.reducer;
