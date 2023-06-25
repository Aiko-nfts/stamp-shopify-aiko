import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  productSlice: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState: {products: []},
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const {addProduct} = productSlice.actions;

export default productSlice.reducer;
