import { apiSlice } from "../api/apiSlice";

export const assignmentAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignment: builder.query({
      query: (id) => `/assignments/${id}`,
      providesTags:['assignmentMark']
    }),
    getAllAssignment:builder.query({
      query:()=>'/assignments',
      providesTags:['assignments']
    }),
    getAssignments: builder.query({
       query:()=>'/assignmentMark',
       providesTags:['assignmentMarks']
    }),
    postAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignmentMark",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const q = await queryFulfilled;
        console.log("postAss", q?.data);
      },
    }),
    editAssignment:builder.mutation({
      query:({id,data})=>({
        url:`/assignmentMark/${id}`,
        method:'PATCH',
        body:data
      }),
      invalidatesTags:['assignmentMarks','assignmentMark']
    })
  }),
});
export const { useGetAssignmentQuery, useGetAllAssignmentQuery,usePostAssignmentMutation,useGetAssignmentsQuery ,useEditAssignmentMutation} =
  assignmentAPI;
