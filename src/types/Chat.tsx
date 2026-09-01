import type { UUID } from "crypto"
import type { ChatTypeKey } from "../constants"
import type { MessageBasic } from "../types/Message"
import type { Pagination, PaginationWrapper, Search } from "../types/Utils"

export type ChatParameters = {
  chat_type: ChatTypeKey
}

export type StartChatSerializerInput = {
  participant_id: UUID
}

export type StartChatSerializerOutput = {
  chat_id: UUID
  created: Date
}

export type ChatBasic = {
  id: UUID
  name: string
  description: string
  photo: File | null
  created_at: Date
  last_message_at: Date
}

export type ChatParticipantMetadata = {
  is_muted: boolean
  not_seen: number
}

export type ChatDetailed = {
  id: UUID
  name: string
  photo: File | null
  last_message: MessageBasic
  metadata: ChatParticipantMetadata
}

export type AllChatBasicResponse = PaginationWrapper<ChatBasic>
export type AllChatDetailResponse = PaginationWrapper<ChatDetailed>
export type AllChatRequest = Partial<Pagination> &
  Partial<Search> &
  Partial<ChatParameters>
