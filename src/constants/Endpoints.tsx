export const API_URL = import.meta.env.VITE_API_URL as string

export const ENDPOINT = {
  LOGIN: "/login/",
  LOGOUT: "/logout/",
  REGISTER: "/register/",
  REFRESH: "/refresh-token/",
  ME: "/me/",
  PROFILE: "/profile/",
} as const

export type Endpoint = (typeof ENDPOINT)[keyof typeof ENDPOINT]
