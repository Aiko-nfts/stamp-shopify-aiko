import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  showDrawer: false,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    setShowDrawer: (state, action) => {
      state.showDrawer = action.payload;
    },
  },
});

export const {setShowDrawer} = drawerSlice.actions;

export default drawerSlice.reducer;
