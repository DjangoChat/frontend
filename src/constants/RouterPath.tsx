export const ROUTES_KEYS = {
  ROOT: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  REGISTER_SUCCESS: "/register/success",
  DASHBOARD: "/dashboard",
} as const

export type RouteKey = (typeof ROUTES_KEYS)[keyof typeof ROUTES_KEYS]
