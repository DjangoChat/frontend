import { isAnyOf, type Middleware } from "@reduxjs/toolkit"
import { WS_ENDPOINT } from "../../constants"
import { authApi } from "../services/AuthApi"
import { setActiveChatId } from "../slices/SocketSlice"
import { ChatSocketManager } from "./chatSocket"
import { NotificationSocketManager } from "./notificationSocket"
import type { ChatSocketOutgoingMessage } from "./protocol"

const CONNECT_CHAT = "sockets/chat/connect"
const DISCONNECT_CHAT = "sockets/chat/disconnect"
const SEND_CHAT_MESSAGE = "sockets/chat/send"

/** Dispatch to (re)connect the per-chat socket. Not invoked anywhere yet. */
export const connectChatSocket = (chatId: string) =>
  ({ type: CONNECT_CHAT, payload: chatId }) as const

/** Dispatch to close the active chat socket. Not invoked anywhere yet. */
export const disconnectChatSocket = () => ({ type: DISCONNECT_CHAT }) as const

/** Dispatch to send a command over the active chat socket. Not invoked anywhere yet. */
export const sendChatMessage = (message: ChatSocketOutgoingMessage) =>
  ({ type: SEND_CHAT_MESSAGE, payload: message }) as const

type ChatSocketAction =
  | ReturnType<typeof connectChatSocket>
  | ReturnType<typeof disconnectChatSocket>
  | ReturnType<typeof sendChatMessage>

/**
 * Owns the lifecycle of both socket managers as module-level singletons,
 * driven entirely by dispatched actions:
 *  - Notification socket connects automatically once `me` (the app's
 *    auth-truth query, see AuthProvider.tsx) succeeds, and disconnects on
 *    logout or when `me` is rejected (session expired).
 *  - Chat socket only connects/disconnects/sends in reaction to the
 *    `connectChatSocket` / `disconnectChatSocket` / `sendChatMessage` action
 *    creators above, which nothing dispatches yet by design — wire these up
 *    from a chat page via `useChatSocket` when that feature is built.
 */
export const socketMiddleware: Middleware = storeApi => {
  let notificationManager: NotificationSocketManager | null = null
  let chatManager: ChatSocketManager | null = null

  return next => (action: unknown) => {
    const result = next(action)

    if (isAnyOf(authApi.endpoints.me.matchFulfilled)(action)) {
      notificationManager ??= new NotificationSocketManager({
        url: WS_ENDPOINT.NOTIFICATIONS,
        dispatch: storeApi.dispatch,
      })
      notificationManager.connect()
    }

    if (
      isAnyOf(
        authApi.endpoints.logout.matchFulfilled,
        authApi.endpoints.me.matchRejected,
      )(action)
    ) {
      notificationManager?.disconnect()
      chatManager?.disconnect()
      chatManager = null
    }

    const chatAction = action as ChatSocketAction

    if (chatAction.type === CONNECT_CHAT) {
      chatManager?.disconnect()
      chatManager = new ChatSocketManager({
        chatId: chatAction.payload,
        dispatch: storeApi.dispatch,
      })
      chatManager.connect()
      storeApi.dispatch(setActiveChatId(chatAction.payload))
    }

    if (chatAction.type === DISCONNECT_CHAT) {
      chatManager?.disconnect()
      chatManager = null
      storeApi.dispatch(setActiveChatId(null))
    }

    if (chatAction.type === SEND_CHAT_MESSAGE) {
      chatManager?.send(chatAction.payload)
    }

    return result
  }
}
