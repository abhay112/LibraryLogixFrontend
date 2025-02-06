import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminAPI = createApi({
  reducerPath: "adminAPI",
  tagTypes:["assign-attendance"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1", // Update with your actual API base URL
  }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (arg) =>
         `/admin/students?type=notPresent`
    }),

    getSeatLayout: builder.query({
      query: ({date, adminId}) => `/admin/seatLayout?adminId=${adminId}&date=${date}`,
      providesTags:["assign-attendance"]
    }),

    getAttendance: builder.query({
      query: ({ date, libraryId, adminId }) =>
        `/admin/attendance/${date}/${libraryId}/${adminId}`,
    }),

    assignSeat: builder.mutation({
      query: (seatData) => ({
        url: "/admin/attendance/assign",
        method: "POST",
        body: seatData,
      }),
      invalidatesTags:["assign-attendance"]
    }),
    
  }),
});

export const { useGetStudentsQuery, useGetSeatLayoutQuery, useGetAttendanceQuery, useAssignSeatMutation} = adminAPI;
