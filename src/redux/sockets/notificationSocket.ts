import type { AppDispatch } from "../index"
import {
  notificationReceived,
  setNotificationStatus,
} from "../slices/SocketSlice"
import type { NotificationSocketIncomingMessage } from "./protocol"
import { SocketManager } from "./socketManager"

type NotificationSocketOptions = {
  url: string
  dispatch: AppDispatch
}

/**
 * Manages the single, app-wide connection to the backend's
 * `NotificationConsumer` (see routing.py -> ws/notifications/). Connected
 * automatically once the user is authenticated (see socketMiddleware.ts) and
 * torn down on logout.
 */
export class NotificationSocketManager {
  private readonly manager: SocketManager
  private readonly dispatch: AppDispatch

  constructor({ url, dispatch }: NotificationSocketOptions) {
    this.dispatch = dispatch
    this.manager = new SocketManager({
      url,
      onMessage: data => {
        this.handleMessage(data as NotificationSocketIncomingMessage)
      },
      onStatusChange: status => this.dispatch(setNotificationStatus(status)),
    })
  }

  connect(): void {
    this.manager.connect()
  }

  disconnect(): void {
    this.manager.disconnect()
  }

  private handleMessage(data: NotificationSocketIncomingMessage): void {
    this.dispatch(notificationReceived(data))
  }
}
