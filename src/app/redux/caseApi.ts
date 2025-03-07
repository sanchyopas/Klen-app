import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const caseApi = createApi({
  reducerPath: "caseApi",
  baseQuery: fetchBaseQuery({baseUrl: "https://dev.modx.fresco.bz/api/"}),
  endpoints: (builder) => ({
      getProjectById: builder.query({
        query: (id) => `cases/${id}`
      })
    }
  )
})

export const { useGetProjectByIdQuery } = caseApi;