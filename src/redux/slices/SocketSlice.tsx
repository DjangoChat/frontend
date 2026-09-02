import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { SocketStatus } from "../sockets/protocol"

export type RealtimeNotification = {
  id: string
  receivedAt: string
  payload: Record<string, unknown>
}

type SocketState = {
  notificationStatus: SocketStatus
  chatStatus: SocketStatus
  activeChatId: string | null
  feed: RealtimeNotification[]
}

const MAX_FEED_SIZE = 50

const initialState: SocketState = {
  notificationStatus: "idle",
  chatStatus: "idle",
  activeChatId: null,
  feed: [],
}

const socketSlice = createSlice({
  name: "sockets",
  initialState,
  reducers: {
    setNotificationStatus: (state, action: PayloadAction<SocketStatus>) => {
      state.notificationStatus = action.payload
    },
    setChatStatus: (state, action: PayloadAction<SocketStatus>) => {
      state.chatStatus = action.payload
    },
    setActiveChatId: (state, action: PayloadAction<string | null>) => {
      state.activeChatId = action.payload
    },
    notificationReceived: {
      reducer: (state, action: PayloadAction<RealtimeNotification>) => {
        state.feed.unshift(action.payload)
        state.feed = state.feed.slice(0, MAX_FEED_SIZE)
      },
      prepare: (payload: Record<string, unknown>) => ({
        payload: {
          id: crypto.randomUUID(),
          receivedAt: new Date().toISOString(),
          payload,
        },
      }),
    },
    clearFeed: state => {
      state.feed = []
    },
  },
})

export const {
  setNotificationStatus,
  setChatStatus,
  setActiveChatId,
  notificationReceived,
  clearFeed,
} = socketSlice.actions

export const socketReducer = socketSlice.reducer
