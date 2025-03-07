import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dev.modx.fresco.bz/api" }),
  endpoints: (builder) => ({
    getProjectById: builder.query({
      query: (id) => `/cases/${id}`,
    }),
  }),
});

export const { useGetProjectByIdQuery } = apiSlice;
