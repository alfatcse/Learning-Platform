import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';

import authSliceReducer from '../features/auth/authSlice';
import videoSlice from '../features/videos/videoSlice';
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth:authSliceReducer,
    videos:videoSlice
  },
  devTools:process.env.NODE_ENV!=='production',
  middleware:(getDefaultMiddlewares)=>getDefaultMiddlewares().concat(apiSlice.middleware)
});
