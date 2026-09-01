import type { MessageTypeKey } from "../constants"
import type { ParticipantBasic } from "./Participant"

export type MessageBasic = {
  message_type: MessageTypeKey
  content: string
  sent_at: Date
  participant: ParticipantBasic
}
