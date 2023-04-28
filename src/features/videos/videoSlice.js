import { createSlice } from "@reduxjs/toolkit";
const initialState={
   videos:[]
}
const videoSlice=createSlice({
    name:"videos",
    initialState,
    reducers:{
        getVideos:(state,action)=>{
            state.videos=action.payload
        }
    }
})
export const {getVideos}=videoSlice.actions;
export default videoSlice.reducer;