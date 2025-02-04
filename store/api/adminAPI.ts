import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminAPI = createApi({
  reducerPath: "adminAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1", // Update with your actual API base URL
  }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (arg) => arg ? `/admin/students` : "/admin/students", // Optional arg handling
    }),
    getSeatLayout: builder.query({
      query: ({adminId}) => `/admin/seatLayout?adminId=${adminId}`,
    }),

    getAttendance: builder.query({
      query: ({ date, libraryId, adminId }) =>
        `/admin/attendance/${date}/${libraryId}/${adminId}`,
    }),
    
  }),
});

export const { useGetStudentsQuery, useGetSeatLayoutQuery, useGetAttendanceQuery } = adminAPI;
