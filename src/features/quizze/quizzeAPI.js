import { apiSlice } from "../api/apiSlice";


export const quizzeAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: (id) => `/quizzes?video_id_like=${id}`,
    })
  }),
});
export const { useGetQuizzesQuery } = quizzeAPI;
