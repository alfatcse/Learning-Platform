import { apiSlice } from "../api/apiSlice";
import { getAssignmentMark } from "../leaderboard/leaderboardSlice";
export const quizzeAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: (id) => `/quizzes?video_id_like=${id}`,
    }),
    postQuizMark:builder.mutation({
      query:(data)=>({
        url:'/quizMark',
        method:"POST",
        body:data
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
            const QuizzMarkData=await queryFulfilled;
            console.log(QuizzMarkData);
            if(QuizzMarkData?.data){
                dispatch(getAssignmentMark(QuizzMarkData.data))
            }
        } catch (err) {}
      },
    })
  }),
});
export const { useGetQuizzesQuery ,usePostQuizMarkMutation} = quizzeAPI;
