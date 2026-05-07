export const ROUTES_KEYS = {
  ROOT: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  REGISTER_SUCCESS: "/success",
  DASHBOARD: "/dashboard",
  ONBOARDING: "/onboarding/",
  ONBOARDING_PROFILE: "/onboarding/profile/",
  ONBOARDING_METADATA: "/onboarding/metadata/",
  ONBOARDING_SUBSCRIPTION: "/onboarding/subscription/",
  SUBSCRIPTION_SUCCESS: "/subscription/success/",
  SUBSCRIPTION_CANCEL: "/subscription/cancel/",
} as const

export type RouteKey = (typeof ROUTES_KEYS)[keyof typeof ROUTES_KEYS]
