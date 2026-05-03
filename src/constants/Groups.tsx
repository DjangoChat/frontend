export const GROUPS = {
  MEMBER: "MEMBER",
  MAINTAINER: "MAINTAINER",
  ANALITICAL: "ANALITICAL",
  ADMIN: "ADMIN",
} as const

export type GroupKey = (typeof GROUPS)[keyof typeof GROUPS]
