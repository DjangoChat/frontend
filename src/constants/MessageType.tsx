export const MESSAGE_TYPE = {
  TEXT: "TEXT",
  VIDEO: "VIDEO",
  FILE: "FILE",
  IMAGE: "IMAGE",
} as const

export type MessageTypeKey = (typeof MESSAGE_TYPE)[keyof typeof MESSAGE_TYPE]
