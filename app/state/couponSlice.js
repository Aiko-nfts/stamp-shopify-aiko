import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  showCoupon: false,
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    setShowCoupon: (state, action) => {
      state.showCoupon = action.payload;
    },
  },
});

export const {setShowCoupon} = couponSlice.actions;

export default couponSlice.reducer;
