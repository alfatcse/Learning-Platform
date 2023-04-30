import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';

import authSliceReducer from '../features/auth/authSlice';
import leaderboardSlice from '../features/leaderboard/leaderboardSlice';
import quizzeSlice from '../features/quizze/quizzeSlice';
import videoSlice from '../features/videos/videoSlice';
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth:authSliceReducer,
    videos:videoSlice,
    leaderboard:leaderboardSlice,
    quizze:quizzeSlice
  },
  devTools:process.env.NODE_ENV!=='production',
  middleware:(getDefaultMiddlewares)=>getDefaultMiddlewares().concat(apiSlice.middleware)
});
