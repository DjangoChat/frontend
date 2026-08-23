import { useContext } from "react"
import { AuthContext } from "../contexts/AuthProvider"
import { AUTH_STATES } from "../constants"

export const useAuth = () => {
  const auth = useContext(AuthContext)

  if (auth === null) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return auth
}

export const useAuthenticatedAuth = () => {
  const auth = useAuth()

  if (auth.status !== AUTH_STATES.AUTHENTICATED) {
    throw new Error(
      "useAuthenticatedAuth must be used inside an authenticated route",
    )
  }

  return auth
}
