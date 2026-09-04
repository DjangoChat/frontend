import CircleIcon from "@mui/icons-material/Circle"
import Box from "@mui/joy/Box"
import ListDivider from "@mui/joy/ListDivider"
import ListItem from "@mui/joy/ListItem"
import ListItemButton from "@mui/joy/ListItemButton"
import Stack from "@mui/joy/Stack"
import Typography from "@mui/joy/Typography"
import { Fragment } from "react"
import type { ParticipantBasic } from "../../../../../types"
import { AvatarWithStatus } from "./AvatarWithStatus"

export type ChatListItemData = {
  id: string
  name: string
  photo?: string | null
  sender: ParticipantBasic | null
  lastMessageContent: string | null
  unread: boolean
}

type ChatListItemProps = ChatListItemData & {
  selectedChatId: string | null
  onSelect: (chatId: string) => void
}

export const ChatListItem = ({
  id,
  name,
  photo,
  sender,
  lastMessageContent,
  unread,
  selectedChatId,
  onSelect,
}: ChatListItemProps) => {
  const selected = selectedChatId === id
  const displayName = sender
    ? `${sender.first_name} ${sender.last_name}`.trim() ||
      sender.nickname ||
      name
    : name
  const avatarSrc = photo ?? (sender?.avatar as unknown as string | undefined)
  const online = sender?.participant_status === "online"

  return (
    <Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => {
            onSelect(id)
          }}
          selected={selected}
          color="neutral"
          sx={{ flexDirection: "column", alignItems: "initial", gap: 1 }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus
              src={avatarSrc}
              name={displayName}
              online={online}
            />
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">{displayName}</Typography>
              {sender?.nickname && (
                <Typography level="body-sm">{sender.nickname}</Typography>
              )}
            </Box>
            <Box sx={{ lineHeight: 1.5, textAlign: "right" }}>
              {unread && <CircleIcon sx={{ fontSize: 12 }} color="primary" />}
            </Box>
          </Stack>
          {lastMessageContent && (
            <Typography
              level="body-sm"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {lastMessageContent}
            </Typography>
          )}
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </Fragment>
  )
}
