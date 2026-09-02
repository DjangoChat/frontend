import { WS_ENDPOINT } from "../../constants"
import type { AppDispatch } from "../index"
import { setChatStatus } from "../slices/SocketSlice"
import type {
  ChatSocketIncomingMessage,
  ChatSocketOutgoingMessage,
} from "./protocol"
import { SocketManager } from "./socketManager"

type ChatSocketOptions = {
  chatId: string
  dispatch: AppDispatch
}

/**
 * Manages the per-chat connection to the backend's `ChatConsumer` (see
 * routing.py -> ws/chat/<uuid:chat_id>/). Not activated anywhere yet — wire
 * this up (via `useChatSocket`) once a chat page component exists.
 *
 * Note: the backend ChatConsumer currently only validates inbound event
 * payloads (send_message/typing/seen/delete_message/react_message) and does
 * not yet broadcast anything back via group_send, so `handleMessage` is a
 * placeholder until that server-side logic is implemented.
 */
export class ChatSocketManager {
  private readonly manager: SocketManager
  private readonly dispatch: AppDispatch

  constructor({ chatId, dispatch }: ChatSocketOptions) {
    this.dispatch = dispatch
    this.manager = new SocketManager({
      url: WS_ENDPOINT.chat(chatId),
      onMessage: data => {
        this.handleMessage(data as ChatSocketIncomingMessage)
      },
      onStatusChange: status => this.dispatch(setChatStatus(status)),
    })
  }

  connect(): void {
    this.manager.connect()
  }

  disconnect(): void {
    this.manager.disconnect()
  }

  send(message: ChatSocketOutgoingMessage): boolean {
    return this.manager.send(message)
  }

  private handleMessage(data: ChatSocketIncomingMessage): void {
    // TODO: dispatch chat-specific actions (message_created, typing_started,
    // etc.) once the backend ChatConsumer implements real event broadcasting.
    void data
  }
}
