import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const caseApi = createApi({
  reducerPath: "caseApi",
  baseQuery: fetchBaseQuery({baseUrl: `${API_URL}/api/`}),
  endpoints: (builder) => ({
      getProjectById: builder.query({
        query: (id) => `cases/${id}`
      })
    }
  )
})

export const { useGetProjectByIdQuery } = caseApi;