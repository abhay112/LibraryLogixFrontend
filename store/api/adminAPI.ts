import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminAPI = createApi({
  reducerPath: "adminAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1", // Update with your actual API base URL
  }),
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (arg) => arg ? `/admins/students` : "/admins/students", // Optional arg handling
    }),
  }),
});

export const { useGetStudentsQuery } = adminAPI;
