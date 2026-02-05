import type { Login, Register } from "../../types"
import { api } from "./api"

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<null, Login>({
      query: data => ({
        url: "/login/",
        method: "POST",
        body: data,
      }),
    }),

    logout: build.mutation<null, null>({
      query: () => ({
        url: "/logout/",
        method: "POST",
      }),
    }),

    refreshToken: build.mutation<null, null>({
      query: () => ({
        url: "/refresh-token/",
        method: "POST",
      }),
    }),

    register: build.mutation<null, Register>({
      query: data => ({
        url: "/register/",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useRegisterMutation,
} = authApi
