import { apiSlice } from "../api/apiSlice";
import { getAssignmentMark } from "../leaderboard/leaderboardSlice";
export const quizzeAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: (id) => `/quizzes?video_id_like=${id}`,
    }),
    getAllQuizzes: builder.query({
      query: () => "/quizzes",
      providesTags: ["quizzes"],
    }),
    deleteQuizze: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["quizzes"],
    }),
    postQuiz: builder.mutation({
      query:(data)=>({
        url: "/quizzes",
        method:'POST',
        body:data
      }),
      invalidatesTags:['quizzes']
    }),
    postQuizMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const QuizzMarkData = await queryFulfilled;
          console.log(QuizzMarkData);
          if (QuizzMarkData?.data) {
            dispatch(getAssignmentMark(QuizzMarkData.data));
          }
        } catch (err) {}
      },
    }),
  }),
});
export const {
  useGetQuizzesQuery,
  usePostQuizMarkMutation,
  useGetAllQuizzesQuery,
  useDeleteQuizzeMutation,
  usePostQuizMutation
} = quizzeAPI;
