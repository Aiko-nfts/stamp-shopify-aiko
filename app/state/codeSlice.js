import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  couponCode: '',
};

const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    setCouponCode: (state, action) => {
      state.couponCode = action.payload;
    },
  },
});

export const {setCouponCode} = codeSlice.actions;

export default codeSlice.reducer;
