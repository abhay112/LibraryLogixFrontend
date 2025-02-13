import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminAPI = createApi({
  reducerPath: "adminAPI",
  tagTypes:["assign-attendance"],
  baseQuery: fetchBaseQuery({
    baseUrl:  process.env.NEXT_PUBLIC_BACKEND_API_URL, // Update with your actual API base URL
  }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (params) => ({
        url: '/admin/students',
        params: {  ...params }, 
      }),
      providesTags: ['assign-attendance'],
    }),

    updateStudent: builder.mutation({
      query: (stuData) => ({
        url: `/admin/students/${stuData?.id}`,
        method: "PUT",
        body: stuData,
      }),
      invalidatesTags:["assign-attendance"]
    }),

    createStudent: builder.mutation({
      query: (stuData) => ({
        url: `/admin/students`,
        method: "POST",
        body: stuData,
      }),
      invalidatesTags:["assign-attendance"]
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
      providesTags:["assign-attendance"]
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

    //fees
    getFees: builder.query({
      query: ({ date, adminId,status }) =>
        `/admin/fees?adminId=${adminId}&date=${date}&status=${status}`,
      providesTags:["assign-attendance"]
    }),

    //stats
    getAdminStats: builder.query({
      query: ({ date, adminId }) => `/admin/stats?adminId=${adminId}&date=${date}`,
      providesTags:["assign-attendance"]
    }),
    
  }),
});

export const { useGetStudentsQuery, useUpdateStudentMutation, useCreateStudentMutation, useGetSeatLayoutQuery, useGetSeatLayoutByShiftQuery, useGetAttendanceQuery, useAssignSeatMutation , useVacantSeatMutation , useGetAdminStatsQuery,  useGetFeesQuery} = adminAPI;