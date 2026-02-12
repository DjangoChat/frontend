import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit"

export type Notification = {
  id: string
  message: string
  severity: "danger" | "warning"
}

type NotificationState = {
  notifications: Notification[]
}

const initialState: NotificationState = {
  notifications: [],
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: {
      reducer: (state, action: PayloadAction<Notification>) => {
        state.notifications.push(action.payload)
      },
      prepare: (
        message: string,
        severity: "danger" | "warning" = "danger",
      ) => ({
        payload: { id: nanoid(), message, severity },
      }),
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        n => n.id !== action.payload,
      )
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions
export const notificationReducer = notificationSlice.reducer
