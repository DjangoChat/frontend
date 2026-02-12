import CloseIcon from "@mui/icons-material/Close"
import { IconButton, Snackbar, Stack } from "@mui/joy"
import { useAppDispatch, useAppSelector } from "../redux"
import type { Notification } from "../redux/slices/NotificationSlice"
import { removeNotification } from "../redux/slices/NotificationSlice"

export function SnackbarContainer() {
  const notifications = useAppSelector(
    (state): Notification[] => state.notification.notifications,
  )
  const dispatch = useAppDispatch()

  return (
    <Stack
      spacing={1}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 9999,
      }}
    >
      {notifications.map(notification => (
        <Snackbar
          key={notification.id}
          open
          variant="outlined"
          color={notification.severity}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          endDecorator={
            <IconButton
              size="sm"
              variant="plain"
              color={notification.severity}
              onClick={() => dispatch(removeNotification(notification.id))}
            >
              <CloseIcon />
            </IconButton>
          }
          sx={{ position: "relative", right: 0, bottom: 0 }}
        >
          {notification.message}
        </Snackbar>
      ))}
    </Stack>
  )
}
