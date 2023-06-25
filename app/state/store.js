import {configureStore} from '@reduxjs/toolkit';
import checkoutReducer from './checkoutSlice';
import codeReducer from './codeSlice';
import couponReducer from './couponSlice';
import redeemableReducer from './redeemableSlice';
import rewardReducer from './rewardSlice';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: {
    checkout: checkoutReducer,
    code: codeReducer,
    coupon: couponReducer,
    reward: rewardReducer,
    redeemable: redeemableReducer,
    product: productReducer,
  },
});
