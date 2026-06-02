import type { UUID } from "crypto"
import type { Pagination, PaginationWrapper, Search } from "./Utils"

export type AgentParameters = {
  agent_type: string
  natures__name: string
}

export type Agent = {
  id: UUID
  name: string
  description: string
  avatar: string
  natures: string[]
  agent_type: string
  has_permission: boolean
}

export type AllAgentResponse = PaginationWrapper<Agent[]>
export type AllAgentRequeset = Partial<Pagination> &
  Partial<Search> &
  Partial<AgentParameters>
