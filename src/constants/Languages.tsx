export const LANGUAGES = {
  EN: "en",
  ES: "es",
} as const

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES]
