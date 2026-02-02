export const ROUTES_KEYS = {
  ROOT: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
} as const

export type RouteKey = (typeof ROUTES_KEYS)[keyof typeof ROUTES_KEYS]

export const LANGUAGES = {
  EN: "en",
  ES: "es",
} as const

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES]
