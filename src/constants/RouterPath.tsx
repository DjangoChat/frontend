export const ROUTES_KEYS = {
  ROOT: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  SIGNUP: "/register",
} as const

export type RouteKey = (typeof ROUTES_KEYS)[keyof typeof ROUTES_KEYS]
