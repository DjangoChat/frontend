export const GROUPS = {
  MEMBER: "Member",
  MAINTAINER: "Maintainer",
  ANALITICAL: "Analitical",
  ADMIN: "Admin",
} as const

export type GroupKey = (typeof GROUPS)[keyof typeof GROUPS]
