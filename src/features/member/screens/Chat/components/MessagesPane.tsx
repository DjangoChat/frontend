import Box from "@mui/joy/Box"
import Sheet from "@mui/joy/Sheet"
import Stack from "@mui/joy/Stack"
import Typography from "@mui/joy/Typography"
import { useLiveQuery } from "dexie-react-hooks"
import { useIntlayer } from "react-intlayer"
import { db } from "../../../../../db"
import type { SocketStatus } from "../../../../../redux/sockets/protocol"
import type { ChatDetailed } from "../../../../../types"
import { AvatarWithStatus } from "./AvatarWithStatus"

type MessagesPaneProps = {
  chat: ChatDetailed | null
  socketStatus: SocketStatus
}

/**
 * Placeholder message thread pane. Intentionally left without a message
 * list/input — those depend on the messages endpoint/types which are being
 * added separately. Only renders the selected chat's header for now.
 */
export const MessagesPane = ({ chat, socketStatus }: MessagesPaneProps) => {
  const content = useIntlayer("chat") as any

  const participantsFromDB = useLiveQuery(() => db.participants.toArray())

  if (!chat) {
    return (
      <Sheet
        sx={{
          height: { xs: "calc(100dvh - var(--Header-height))", md: "100dvh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography level="body-md" color="neutral">
          {content.selectChat}
        </Typography>
      </Sheet>
    )
  }

  const senderId = chat.last_message.participant.id
  const sender = participantsFromDB?.find(p => p.id === senderId) ?? null
  const displayName = sender
    ? `${sender.first_name} ${sender.last_name}`.trim() ||
      sender.nickname ||
      chat.name
    : chat.name
  const avatarSrc =
    (chat.photo as unknown as string | undefined) ??
    (sender?.avatar as unknown as string | undefined)

  return (
    <Sheet
      sx={{
        height: { xs: "calc(100dvh - var(--Header-height))", md: "100dvh" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <AvatarWithStatus
          src={avatarSrc}
          name={displayName}
          online={sender?.participant_status === "online"}
        />
        <Box sx={{ flex: 1 }}>
          <Typography level="title-md">{displayName}</Typography>
          <Typography level="body-xs" color="neutral">
            {socketStatus}
          </Typography>
        </Box>
      </Stack>

      {/* TODO: message list + input, once message types/endpoints exist */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography level="body-sm" color="neutral">
          {content.noMessages}
        </Typography>
      </Box>
    </Sheet>
  )
}
