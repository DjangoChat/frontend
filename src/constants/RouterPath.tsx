export const ROUTES_KEYS = {
  // AUTH
  ROOT: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  REGISTER_SUCCESS: "/success",

  // ONBOARDING
  ONBOARDING: "/onboarding/",
  ONBOARDING_PROFILE: "/onboarding/profile/",
  ONBOARDING_METADATA: "/onboarding/metadata/",
  ONBOARDING_SUBSCRIPTION: "/onboarding/subscription/",

  // DAHBOARD
  DASHBOARD: "/dashboard/",
  DASHBOARD_CHAT: "/dashboard/chat/",
  DASHBOARD_GROUP: "/dashboard/group/",
  DASHBOARD_AGENT: "/dashboard/agent/",
  DASHBOARD_REPORT: "/dashboard/report/",
  DASHBOARD_STAT: "/dashboard/stat/",
  DASHBOARD_PLAN: "/dashboard/plan/",
  DASHBOARD_PRICE: "/dashboard/price/",
  DASHBOARD_PROFILE: "/dashboard/profile/",
  DASHBOARD_SETTING: "/dashboard/setting/",
  DASHBOARD_SUBSCRIPTION: "/dashboard/subscription/",
} as const

export type RouteKey = (typeof ROUTES_KEYS)[keyof typeof ROUTES_KEYS]
