import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  couponError: false,
};

const couponErrorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setCouponError: (state, action) => {
      state.couponError = action.payload;
    },
  },
});

export const {setCouponError} = couponErrorSlice.actions;

export default couponErrorSlice.reducer;
