import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { API_URL } from "../../constants"

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
})

const baseQueryRetry = retry(baseQuery, { maxRetries: 3 })

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryRetry,
  endpoints: () => ({}),
})
