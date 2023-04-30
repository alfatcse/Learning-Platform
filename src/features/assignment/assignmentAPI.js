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
    }),
  }),
});
export const { useGetAssignmentQuery ,usePostAssignmentMutation} = assignmentAPI;
