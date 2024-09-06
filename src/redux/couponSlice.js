import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../../src/config/axiosConfig";

export const fetchCoupons = createAsyncThunk(
  "coupons/fetchCoupons",
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get("coupons/get-all-coupons");
      return response.data.coupons;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCoupon = createAsyncThunk(
  "coupons/addCoupon",
  async (newCouponData, {rejectWithValue}) => {
    try {
      const response = await api.post("coupons/create-coupon", newCouponData);
      return response.data.coupon;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeCoupon = createAsyncThunk(
  "coupons/removeCoupon",
  async (couponId, {rejectWithValue}) => {
    try{
      await api.delete(`coupons/delete-coupon/${couponId}`)
      return couponId;
    }catch(error){
      return rejectWithValue(error.response.data);
    }
  }
)

// for the user
export const fetchAvailableCoupons = createAsyncThunk(
  'coupons/fetchAvailableCoupons',
  async (totalPrice) => {
    const response = await api.get(`/coupons/avlible-coupons?totalPrice=${totalPrice}`);
    return response.data.coupons;
  }
);


export const applyCouponPricingDetails = createAsyncThunk(
  "coupons/applyCouponPricingDetails",
  async(couponId, {rejectWithValue}) => {
    try{
      const response = await api.post("cart/checkout", {couponId})
      return response?.data
    }catch(error) {
      return rejectWithValue(error.response.data.message);
    }
  }
)

const couponSlice = createSlice({
  name: "coupons",
  initialState: {
    coupons: [],
    pricingDetails: {
      originalTotalPrice: 0,
      totalPriceAfterDiscount: 0,
      savedTotal: 0,
      couponDiscount: 0,
      finalPrice: 0,
    },
    selectedCoupon: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectCoupon : (state, action) => {
      state.selectedCoupon = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.coupons = action.payload;
        state.loading = false;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCoupon.fulfilled, (state, action) => {
        state.coupons.unshift(action.payload); 
        state.loading = false;
      })
      .addCase(addCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter(
          (coupon) => coupon._id !== action.payload
        )
      })
      //for users
      .addCase(fetchAvailableCoupons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAvailableCoupons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coupons = action.payload;
      })
      .addCase(fetchAvailableCoupons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      //for the coupon adding and getting price detials
      .addCase(applyCouponPricingDetails.fulfilled, (state, action) => {
        state.pricingDetails = action.payload;
      })
  },
});

export const { selectCoupon } = couponSlice.actions;
export default couponSlice.reducer;
