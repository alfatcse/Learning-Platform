import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  quizzeMark: [],
  assimentMark: [],
  topTwenty: [],
};
const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    getQuizzeMark: (state, action) => {
      state.quizzeMark = action.payload;
    },
    getAssignmentMark: (state, action) => {
      state.assimentMark = action.payload;
    },
    getTopPosition: (state, action) => {
     
    },
  },
});
export const { getAssignmentMark, getQuizzeMark } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
