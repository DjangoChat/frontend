import type { UUID } from "crypto"
import type { RepresentationKey } from "../constants"
import type { Agent } from "./Agent"
import type { Pagination, PaginationWrapper, Search } from "./Utils"

export type ParticipantParameters = {
  participant_type: string
  representation: RepresentationKey
}

export type ParticipantBasic = {
  id: UUID
  first_name: string
  last_name: string
  nickname: string
  avatar?: File
  participant_status: string
}

export type ParticipantDetailed = {
  id: UUID
  details: Agent | null
}

export type AllParticipantBasicResponse = PaginationWrapper<ParticipantBasic>
export type AllParticipantDetailResponse =
  PaginationWrapper<ParticipantDetailed>
export type AllParticipantRequest = Partial<Pagination> &
  Partial<Search> &
  Partial<ParticipantParameters>
