import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  redeemableAmount: 0,
};

const redeemableSlice = createSlice({
  name: 'redeemable',
  initialState,
  reducers: {
    setRedeemableAmount: (state, action) => {
      state.redeemableAmount = action.payload;
    },
  },
});

export const {setRedeemableAmount} = redeemableSlice.actions;

export default redeemableSlice.reducer;
