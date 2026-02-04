export const API_URL = import.meta.env.VITE_API_URL as string

export const ENDPOINT = {
  PROFILE: "/me/",
} as const

export type Endpoint = (typeof ENDPOINT)[keyof typeof ENDPOINT]
