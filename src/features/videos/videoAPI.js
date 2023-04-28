import { apiSlice } from "../api/apiSlice";

export const videoAPI=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getVideos:builder.query({
            query:()=>'/videos'
        })
    })
})
export const {useGetVideosQuery}=videoAPI