import { createContext, useEffect, useState, type ReactNode } from "react"
import { useMeQuery } from "../redux"
import type { LoginResponse } from "../types"

type ContextProviderProps = {
  children?: ReactNode
}

export const AuthContext = createContext<{
  user: LoginResponse | null
  isAuth: boolean
  isLoading: boolean
}>({
  user: null,
  isAuth: false,
  isLoading: false,
})

export const AuthProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<LoginResponse | null>(null)
  const [isAuth, setIsAuth] = useState<boolean>(false)

  const { data, isError, isLoading } = useMeQuery(null)

  useEffect(() => {
    if (data) {
      setUser(data)
      setIsAuth(true)
    } else if (isError) {
      setUser(null)
      setIsAuth(false)
    }
  }, [data, isError])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        isLoading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
