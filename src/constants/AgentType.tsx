export const AGENT_TYPE = {
  BASIC: "BASIC",
  MEDIUM: "MEDIUM",
  ADVANCE: "ADVANCE",
} as const

export type AgentTypeKey = (typeof AGENT_TYPE)[keyof typeof AGENT_TYPE]
