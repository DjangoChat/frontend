import { ENDPOINT } from "../../constants"
import type { LoginRequest, LoginResponse, Register } from "../../types"
import { api } from "./api"

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: data => ({
        url: ENDPOINT.LOGIN,
        method: "POST",
        body: data,
      }),
    }),

    logout: build.mutation<null, null>({
      query: () => ({
        url: ENDPOINT.LOGOUT,
        method: "POST",
      }),
    }),

    refreshToken: build.mutation<null, null>({
      query: () => ({
        url: ENDPOINT.REFRESH,
        method: "POST",
      }),
    }),

    register: build.mutation<null, Register>({
      query: data => ({
        url: ENDPOINT.REGISTER,
        method: "POST",
        body: data,
      }),
    }),

    me: build.query<LoginResponse, null>({
      query: () => ({
        url: ENDPOINT.ME,
        method: "POST",
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
  useMeQuery,
} = authApi
