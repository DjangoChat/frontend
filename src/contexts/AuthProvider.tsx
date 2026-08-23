import { createContext, useCallback, useMemo } from "react"
import { Outlet } from "react-router"
import { useMeQuery } from "../redux"
import type { LoginResponse } from "../types"
import { AUTH_STATES } from "../constants"

type AuthContextValue =
  | {
      status: AUTH_STATES.LOADING
      user: null
      isFetching: boolean
      refetchData: () => Promise<void>
    }
  | {
      status: AUTH_STATES.UNAUTHENTICATED
      user: null
      isFetching: boolean
      refetchData: () => Promise<void>
    }
  | {
      status: AUTH_STATES.AUTHENTICATED
      user: LoginResponse
      isFetching: boolean
      refetchData: () => Promise<void>
    }
  | {
      status: AUTH_STATES.ERROR
      user: null
      isFetching: boolean
      refetchData: () => Promise<void>
    }

export const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = () => {
  const { data, isLoading, isFetching, isError, refetch } = useMeQuery(null)

  const refetchData = useCallback(async () => {
    await refetch()
  }, [refetch])

  const value = useMemo<AuthContextValue>(() => {
    const base = {
      isFetching,
      refetchData,
    }

    if (isLoading) {
      return {
        ...base,
        status: AUTH_STATES.LOADING,
        user: null,
      }
    }

    if (isError) {
      return {
        ...base,
        status: AUTH_STATES.ERROR,
        user: null,
      }
    }

    if (!data) {
      return {
        ...base,
        status: AUTH_STATES.UNAUTHENTICATED,
        user: null,
      }
    }

    return {
      ...base,
      status: AUTH_STATES.AUTHENTICATED,
      user: data,
    }
  }, [data, isLoading, isError, isFetching, refetchData])

  return (
    <AuthContext.Provider value={value}>
      <Outlet />
    </AuthContext.Provider>
  )
}
