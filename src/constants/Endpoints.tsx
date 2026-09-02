export const API_URL =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:8000/api/v1"

const deriveWsBaseUrl = (): string => {
  const explicit = import.meta.env.VITE_WS_URL as string | undefined

  if (explicit) {
    return explicit.replace(/\/$/, "")
  }

  try {
    const url = new URL(API_URL)
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:"
    url.pathname = ""
    url.search = ""
    return url.toString().replace(/\/$/, "")
  } catch {
    return "ws://localhost:8000"
  }
}

export const WS_URL = deriveWsBaseUrl()

// Mirrors config/routing.py websocket_urlpatterns on the backend.
export const WS_ENDPOINT = {
  NOTIFICATIONS: `${WS_URL}/ws/notifications/`,
  chat: (chatId: string) => `${WS_URL}/ws/chat/${chatId}/`,
} as const

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
