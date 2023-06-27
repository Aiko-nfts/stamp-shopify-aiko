import {configureStore} from '@reduxjs/toolkit';
import checkoutReducer from './checkoutSlice';
import codeReducer from './codeSlice';
import couponReducer from './couponSlice';
import redeemableReducer from './redeemableSlice';
import rewardReducer from './rewardSlice';
import productReducer from './productSlice';
import couponErrorReducer from './couponErrorSlice';
import drawerReducer from './drawerSlice';

export const store = configureStore({
  reducer: {
    checkout: checkoutReducer,
    code: codeReducer,
    coupon: couponReducer,
    reward: rewardReducer,
    redeemable: redeemableReducer,
    product: productReducer,
    error: couponErrorReducer,
    drawer: drawerReducer,
  },
});
