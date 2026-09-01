export const PARTICIPANT_TYPE = {
  USER: "USER",
  AGENT: "AGENT",
} as const

export type ParticipantTypeKey =
  (typeof PARTICIPANT_TYPE)[keyof typeof PARTICIPANT_TYPE]
