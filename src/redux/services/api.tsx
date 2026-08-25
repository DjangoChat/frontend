import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL, ENDPOINT } from "../../constants"

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Serialize Date objects in request body
  if (typeof args === "object" && args.body) {
    const body = args.body as Record<string, unknown>
    if (body.birth_date instanceof Date) {
      body.birth_date = body.birth_date.toISOString().split("T")[0]
    }
  }

  // Attempt the initial request
  let result = await baseQuery(args, api, extraOptions)

  // If we get a 401 error, try to refresh the token
  if (result.error?.status === 401) {
    // Attempt to refresh the token
    const refreshResult = await baseQuery(
      {
        url: ENDPOINT.REFRESH,
        method: "POST",
      },
      api,
      extraOptions,
    )

    // If refresh was successful, retry the original request
    if (refreshResult.meta?.response?.ok) {
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "Price", "Participant"],
  endpoints: () => ({}),
})
