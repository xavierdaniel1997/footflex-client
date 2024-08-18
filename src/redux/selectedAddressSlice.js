import { createSlice } from "@reduxjs/toolkit";


const selectedAddressSlice = createSlice({
    name: "address",
    initialState: {
        selectedAddress: null
    },
    reducers: {
        setSelectedAddress : (state, action) => {
            state.selectedAddress = action.payload
        },
        clearSelectedAddress : (state) => {
            state.selectedAddress = null
        }
    }
})

export const {setSelectedAddress, clearSelectedAddress} = selectedAddressSlice.actions
export default selectedAddressSlice.reducer;