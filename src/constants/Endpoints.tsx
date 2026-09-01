export const API_URL =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:8000/api/v1"

export const ENDPOINT = {
  LOGIN: "auth/login/",
  LOGOUT: "auth/logout/",
  REGISTER: "auth/register/",
  REFRESH: "auth/refresh-token/",
  ME: "auth/me/",
  PROFILE: "/profiles/",
  PRICE: "/prices/",
  PARTICIPANT: "/participants/",
  STRIPE: "/stripe/",
  AGENT: "/agents/",
  NATURE: "/natures/",
  ONBOARDING: "/onboard/",
  CHAT: "/chats/",
} as const

export type Endpoint = (typeof ENDPOINT)[keyof typeof ENDPOINT]
