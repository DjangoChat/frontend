import type { SocketStatus } from "./protocol"

type SocketManagerOptions = {
  url: string
  onMessage: (data: unknown) => void
  onStatusChange?: (status: SocketStatus) => void
  /** Maximum number of automatic reconnect attempts. Defaults to 5. */
  maxRetries?: number
  /** Base delay (ms) for exponential backoff. Defaults to 1000. */
  baseDelayMs?: number
}

/**
 * Generic, dependency-free wrapper around the native browser `WebSocket`
 * API. Handles JSON (de)serialization, connection status reporting, and
 * exponential-backoff auto-reconnect. Feature-specific managers
 * (`NotificationSocketManager`, `ChatSocketManager`) compose this instead of
 * talking to `WebSocket` directly, so reconnect/backoff logic lives in one
 * place and scales to any future socket type.
 */
export class SocketManager {
  private ws: WebSocket | null = null
  private readonly url: string
  private readonly onMessage: (data: unknown) => void
  private readonly onStatusChange?: (status: SocketStatus) => void
  private readonly maxRetries: number
  private readonly baseDelayMs: number
  private retryCount = 0
  private manuallyClosed = false
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null

  constructor(options: SocketManagerOptions) {
    this.url = options.url
    this.onMessage = options.onMessage
    this.onStatusChange = options.onStatusChange
    this.maxRetries = options.maxRetries ?? 5
    this.baseDelayMs = options.baseDelayMs ?? 1000
  }

  connect(): void {
    if (
      this.ws &&
      (this.ws.readyState === WebSocket.OPEN ||
        this.ws.readyState === WebSocket.CONNECTING)
    ) {
      return
    }

    this.manuallyClosed = false
    this.clearReconnectTimer()
    this.setStatus("connecting")

    const socket = new WebSocket(this.url)
    this.ws = socket

    socket.onopen = () => {
      this.retryCount = 0
      this.setStatus("open")
    }

    socket.onmessage = event => {
      try {
        const data: unknown = JSON.parse(event.data as string)
        this.onMessage(data)
      } catch {
        // Ignore malformed / non-JSON payloads.
      }
    }

    socket.onerror = () => {
      this.setStatus("error")
    }

    socket.onclose = () => {
      this.ws = null
      this.setStatus("closed")

      if (!this.manuallyClosed) {
        this.scheduleReconnect()
      }
    }
  }

  disconnect(): void {
    this.manuallyClosed = true
    this.clearReconnectTimer()
    this.retryCount = 0

    if (this.ws) {
      this.ws.close()
      this.ws = null
    }

    this.setStatus("idle")
  }

  /** Sends a JSON-serializable payload. Returns false if the socket isn't open. */
  send(data: unknown): boolean {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
      return true
    }

    return false
  }

  get status(): SocketStatus {
    if (!this.ws) return this.manuallyClosed ? "idle" : "closed"

    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return "connecting"
      case WebSocket.OPEN:
        return "open"
      default:
        return "closed"
    }
  }

  private scheduleReconnect(): void {
    if (this.retryCount >= this.maxRetries) {
      return
    }

    const delay = this.baseDelayMs * 2 ** this.retryCount
    this.retryCount += 1

    this.clearReconnectTimer()
    this.reconnectTimer = setTimeout(() => {
      if (!this.manuallyClosed) {
        this.connect()
      }
    }, delay)
  }

  private clearReconnectTimer(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
  }

  private setStatus(status: SocketStatus): void {
    this.onStatusChange?.(status)
  }
}
