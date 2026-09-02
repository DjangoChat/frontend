/**
 * Shared WebSocket protocol contract, mirroring the backend's
 * `ConsumerCommand` / `ConsumerEvent` TextChoices enums
 * (services/backend/src/apps/Chat/models/... ) so both sockets speak the
 * same vocabulary without ad-hoc string literals scattered across the app.
 */

export const ConsumerCommand = {
  CREATE_MESSAGE: "create_message",
  UPDATE_MESSAGE: "update_message",
  DELETE_MESSAGE: "delete_message",
  READ_MESSAGE: "read_message",
  UPDATE_CHAT: "update_chat",
  LEFT_PARTICIPANT: "left_participant",
  JOIN_PARTICIPANT: "join_participant",
  START_TYPING: "start_typing",
  STOP_TYPING: "stop_typing",
  START_RECORDING: "start_recording",
  STOP_RECORDING: "stop_recording",
} as const

export type ConsumerCommand =
  (typeof ConsumerCommand)[keyof typeof ConsumerCommand]

export const ConsumerEvent = {
  MESSAGE_CREATED: "message_created",
  MESSAGE_UPDATED: "message_updated",
  MESSAGE_DELETED: "message_deleted",
  MESSAGE_READ: "message_read",
  CHAT_UPDATED: "chat_updated",
  PARTICIPANT_LEFT: "participant_left",
  PARTICIPANT_JOIN: "parcitipant_joined",
  TYPING_STARTED: "typing_started",
  TYPING_STOPED: "typing_stope",
  RECORDING_STARTED: "recording_started",
  RECORDING_STOPED: "recording_stoped",
} as const

export type ConsumerEvent = (typeof ConsumerEvent)[keyof typeof ConsumerEvent]

/** Lifecycle status of a native WebSocket connection managed by `SocketManager`. */
export type SocketStatus = "idle" | "connecting" | "open" | "closed" | "error"

/** Payload shape sent from the client to the ChatConsumer. */
export type ChatSocketOutgoingMessage = {
  type: ConsumerCommand
  [key: string]: unknown
}

/** Payload shape broadcast from the ChatConsumer to the client. */
export type ChatSocketIncomingMessage = {
  type: ConsumerEvent
  [key: string]: unknown
}

/**
 * The NotificationConsumer does not yet define a fixed event contract on the
 * backend (see NotificationConsumer.py), so incoming payloads are treated as
 * an open-ended record until that contract is finalized.
 */
export type NotificationSocketIncomingMessage = {
  type?: string
  [key: string]: unknown
}
