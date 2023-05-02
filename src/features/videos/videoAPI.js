import { apiSlice } from "../api/apiSlice";
import { getVideos, deleteVideo, postVideo } from "./videoSlice";

export const videoAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(getVideos(result.data));
        } catch (err) {}
      },
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
    }),
    deleteVideo: builder.mutation({
      query: ({ id }) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result) {
            dispatch(deleteVideo(arg.id));
          }
        } catch (err) {}
      },
    }),
    postVideo: builder.mutation({
      query: ({ data }) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if(result?.data){
            dispatch(postVideo(result?.data))
          }
        } catch (er) {}
      },
    }),
  }),
});
export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useDeleteVideoMutation,
  usePostVideoMutation,
} = videoAPI;
