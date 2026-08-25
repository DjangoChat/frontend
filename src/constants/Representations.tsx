export const REPRESENTATIONS = {
  DETAILED: "detailed",
  BRIEF: "brief",
} as const

export type RepresentationKey =
  (typeof REPRESENTATIONS)[keyof typeof REPRESENTATIONS]
