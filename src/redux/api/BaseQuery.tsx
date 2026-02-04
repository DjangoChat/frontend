import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { API_URL } from "../../constants"

export const customBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
})
