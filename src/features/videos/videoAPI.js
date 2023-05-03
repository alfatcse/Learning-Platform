import { apiSlice } from "../api/apiSlice";
import { getVideos, deleteVideo, postVideo, editVideo } from "./videoSlice";

export const videoAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      providesTags: ["videos"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(getVideos(result.data));
        } catch (err) {}
      },
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
      providesTags: ["video"],
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
          if (result?.data) {
            dispatch(postVideo(result?.data));
          }
        } catch (er) {}
      },
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
       invalidatesTags: ["videos",'video'],
    }),
  }),
});
export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useDeleteVideoMutation,
  usePostVideoMutation,
  useEditVideoMutation,
} = videoAPI;
