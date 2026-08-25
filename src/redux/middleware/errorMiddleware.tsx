import type { Middleware } from "@reduxjs/toolkit"
import { isRejectedWithValue } from "@reduxjs/toolkit"
import { addNotification } from "../../redux/slices/NotificationSlice"
import type { CompleteError } from "../../types"

type RejectedPayload = {
  status: number
  data: CompleteError
}

export const errorMiddleware: Middleware = storeApi => next => action => {
  if (isRejectedWithValue(action)) {
    const payload = action.payload as RejectedPayload | undefined

    if (payload && payload.status !== 400) {
      for (const error of payload.data.errors) {
        storeApi.dispatch(addNotification(error.detail))
      }
    }
  }

  return next(action)
}
