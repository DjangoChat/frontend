import { createApi } from "@reduxjs/toolkit/query/react"
import type { Login, Register } from "../../types"
import { customBaseQuery } from "./BaseQuery"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    login: builder.mutation<null, Login>({
      query: data => ({
        url: "/login/",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<null, null>({
      query: () => ({
        url: "/logout/",
        method: "POST",
      }),
    }),

    refreshToken: builder.mutation<null, null>({
      query: () => ({
        url: "/refresh-token/",
        method: "POST",
      }),
    }),

    register: builder.mutation<null, Register>({
      query: data => ({
        url: "/register/",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useRegisterMutation,
} = authApi
