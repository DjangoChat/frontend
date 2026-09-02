import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux"
import {
  connectChatSocket,
  disconnectChatSocket,
  sendChatMessage,
  type ChatSocketOutgoingMessage,
} from "../redux/sockets"

/**
 * Stub hook for future chat-page integration with the ChatConsumer
 * websocket. Nothing invokes this yet — call it from the chat page
 * component once it exists, passing the active chat id, to connect on
 * mount and disconnect on unmount.
 */
export const useChatSocket = (chatId: string | null) => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.sockets.chatStatus)

  useEffect(() => {
    if (!chatId) return

    dispatch(connectChatSocket(chatId))

    return () => {
      dispatch(disconnectChatSocket())
    }
  }, [chatId, dispatch])

  const send = (message: ChatSocketOutgoingMessage) => {
    dispatch(sendChatMessage(message))
  }

  return { status, send }
}
