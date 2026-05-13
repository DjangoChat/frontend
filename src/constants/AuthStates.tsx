export const AUTH_STATES = {
  LOADING: "LOADING",
  AUTHENTICATED: "AUTHENTICATED",
  UNAUTHENTICATED: "UNAUTHENTICATED",
} as const

export type AuthStates = (typeof AUTH_STATES)[keyof typeof AUTH_STATES]
