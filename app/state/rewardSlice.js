import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  activeReward: [],
};

const rewardSlice = createSlice({
  name: 'reward',
  initialState,
  reducers: {
    setActiveReward: (state, action) => {
      state.activeReward = action.payload;
    },
  },
});

export const {setActiveReward} = rewardSlice.actions;

export default rewardSlice.reducer;
