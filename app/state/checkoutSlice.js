import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  checkoutUrl: '',
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCheckoutUrl: (state, action) => {
      state.checkoutUrl = action.payload;
    },
  },
});

export const {setCheckoutUrl} = checkoutSlice.actions;

export default checkoutSlice.reducer;
