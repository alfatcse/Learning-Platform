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
        },
        deleteVideo:(state,action)=>{
            state.videos=state.videos.filter(function (item){
                return item.id!==action.payload
            })
        },
        postVideo:(state,action)=>{
            state.videos.push(action.payload)
        }
    }
})
export const {getVideos,deleteVideo,postVideo}=videoSlice.actions;
export default videoSlice.reducer;