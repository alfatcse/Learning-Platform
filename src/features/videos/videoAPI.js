import { apiSlice } from "../api/apiSlice";
import { getVideos } from "./videoSlice";

export const videoAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
            const result=await queryFulfilled;
            dispatch(getVideos(
                result.data
            ))
        } catch (err) {}
      },
    }),
    getVideo:builder.query({
        query:(id)=>`/videos/${id}`
    })
  }),
});
export const { useGetVideosQuery ,useGetVideoQuery} = videoAPI;
