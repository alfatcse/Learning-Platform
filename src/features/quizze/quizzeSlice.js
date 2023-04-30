import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  totalCorrect: 0,
};
const quizzeSlice = createSlice({
  name: "quizze",
  initialState,
  reducers: {
    quizzeCalculation: (state, action) => {
      if (action.payload === true) {
        state.totalCorrect = state.totalCorrect + 1;
      }
    },
  },
});
export const { quizzeCalculation } = quizzeSlice.actions;
export default quizzeSlice.reducer;
