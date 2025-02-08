import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminAPI = createApi({
  reducerPath: "adminAPI",
  tagTypes:["assign-attendance"],
  baseQuery: fetchBaseQuery({
    baseUrl:  process.env.NEXT_PUBLIC_BACKEND_API_URL, // Update with your actual API base URL
  }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (arg) =>
         `/admin/students?type=notPresent`,
      providesTags:["assign-attendance"]
    }),

    getSeatLayout: builder.query({
      query: ({date, adminId}) => `/admin/seatLayout?adminId=${adminId}&date=${date}`,
      providesTags:["assign-attendance"]
    }),

    getSeatLayoutByShift: builder.query({
      query: ({date, adminId, shift}) => `/admin/seatLayout?adminId=${adminId}&date=${date}&shift=${shift}`,
      providesTags:["assign-attendance"]
    }),

    getAttendance: builder.query({
      query: ({ date, adminId }) =>
        `/admin/attendance/${date}/${adminId}`,
    }),

    assignSeat: builder.mutation({
      query: (seatData) => ({
        url: "/admin/attendance/assign",
        method: "POST",
        body: seatData,
      }),
      invalidatesTags:["assign-attendance"]
    }),

    vacantSeat: builder.mutation({
      query: (seatData) => ({
        url: "/admin/attendance/vacant",
        method: "POST",
        body: seatData,
      }),
      invalidatesTags:["assign-attendance"]
    }),
    
  }),
});

export const { useGetStudentsQuery, useGetSeatLayoutQuery, useGetSeatLayoutByShiftQuery, useGetAttendanceQuery, useAssignSeatMutation , useVacantSeatMutation} = adminAPI;