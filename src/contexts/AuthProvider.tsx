import { createContext, useMemo } from "react"
import { Outlet } from "react-router"
import type { AuthStates } from "../constants"
import { AUTH_STATES } from "../constants"
import { useMeQuery } from "../redux"
import type { LoginResponse } from "../types"

export const AuthContext = createContext<{
  user: LoginResponse | null
  status: AuthStates
  isFetching: boolean
  refetchData: () => Promise<void>
}>({
  user: null,
  status: AUTH_STATES.LOADING,
  isFetching: false,
  refetchData: () => Promise.resolve(),
})

export const AuthProvider = () => {
  const { data, isLoading, isFetching, refetch } = useMeQuery(null)

  const value = useMemo(
    () => ({
      user: data ?? null,
      status: isLoading
        ? AUTH_STATES.LOADING
        : data
          ? AUTH_STATES.AUTHENTICATED
          : AUTH_STATES.UNAUTHENTICATED,
      isFetching,
      refetchData: async () => {
        await refetch()
      },
    }),
    [data, isLoading, isFetching, refetch],
  )

  return (
    <AuthContext.Provider value={value}>
      <Outlet />
    </AuthContext.Provider>
  )
}
