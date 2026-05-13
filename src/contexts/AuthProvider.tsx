import { createContext, type ReactNode } from "react"
import type { AuthStates } from "../constants"
import { AUTH_STATES } from "../constants"
import { useMeQuery } from "../redux"
import type { LoginResponse } from "../types"

type ContextProviderProps = {
  children?: ReactNode
}

export const AuthContext = createContext<{
  user: LoginResponse | null
  status: AuthStates
}>({
  user: null,
  status: AUTH_STATES.LOADING,
})

export const AuthProvider = ({ children }: ContextProviderProps) => {
  const { data, isLoading } = useMeQuery(null)

  return (
    <AuthContext.Provider
      value={{
        user: data ?? null,
        status: isLoading
          ? AUTH_STATES.LOADING
          : data
            ? AUTH_STATES.AUTHENTICATED
            : AUTH_STATES.UNAUTHENTICATED,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
