import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  videos: [],
};
const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    getVideos: (state, action) => {
      state.videos = action.payload;
      console.log(state.videos);
    },
    deleteVideo: (state, action) => {
      state.videos = state.videos.filter(function (item) {
        return item.id !== action.payload;
      });
    },
    postVideo: (state, action) => {
      state.videos.push(action.payload);
    },
    editVideo: (state, action) => {
      console.log("slice", action.payload, state.videos);
    },
  },
});
export const { getVideos, deleteVideo, postVideo, editVideo } =
  videoSlice.actions;
export default videoSlice.reducer;
