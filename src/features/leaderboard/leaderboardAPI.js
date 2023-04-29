import { apiSlice } from "../api/apiSlice";
import { getAssignmentMark, getQuizzeMark } from "./leaderboardSlice";
export const leaderboardAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getassignmentMark: builder.query({
      query: () => "/assignmentMark",
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
            const assignmentMarkData=await queryFulfilled;
            if(assignmentMarkData?.data?.length>0){
                dispatch(getAssignmentMark(assignmentMarkData.data))
            }
        } catch (err) {}
      },
    }),
    getquizzeMark: builder.query({
      query: () => "/quizMark",
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
            const QuizzeMarkData=await queryFulfilled;
            if(QuizzeMarkData?.data?.length>0){
                dispatch(getQuizzeMark(QuizzeMarkData.data))
            }
        } catch (err) {}
      },
    }),
    getStudents:builder.query({
        query:()=>"/users?role=student"
    })
  }),
});
export const { useGetassignmentMarkQuery, useGetquizzeMarkQuery,useGetStudentsQuery } =
  leaderboardAPI;
