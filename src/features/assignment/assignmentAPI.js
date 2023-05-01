import { apiSlice } from "../api/apiSlice";

export const assignmentAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
    }),
    postAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg,{queryFulfilled,dispatch}){
        const q=await queryFulfilled
        console.log('postAss',q?.data);
      }
    }),
  }),
});
export const { useGetAssignmentQuery ,usePostAssignmentMutation} = assignmentAPI;
