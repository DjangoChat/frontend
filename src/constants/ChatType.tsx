export const CHAT_TYPE = {
  AGENT_CHAT: "agent_chat",
  USER_CHAT: "user_chat",
  USER_GROUP: "user_group",
  MIXED_GROUP: "mixed_group",
} as const

export type ChatTypeKey = (typeof CHAT_TYPE)[keyof typeof CHAT_TYPE]
