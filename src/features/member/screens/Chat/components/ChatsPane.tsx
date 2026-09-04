import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import Box from "@mui/joy/Box"
import Chip from "@mui/joy/Chip"
import IconButton from "@mui/joy/IconButton"
import Input from "@mui/joy/Input"
import List from "@mui/joy/List"
import Sheet from "@mui/joy/Sheet"
import Stack from "@mui/joy/Stack"
import Typography from "@mui/joy/Typography"
import { useLiveQuery } from "dexie-react-hooks"
import { useIntlayer } from "react-intlayer"
import { db } from "../../../../../db"
import type { ChatDetailed } from "../../../../../types"
import { ChatListItem } from "./ChatListItem"

type ChatsPaneProps = {
  chats: ChatDetailed[]
  selectedChatId: string | null
  setSelectedChatId: (chatId: string) => void
  searchQuery: string
  onSearchQueryChange: (value: string) => void
}

export const ChatsPane = ({
  chats,
  selectedChatId,
  setSelectedChatId,
  searchQuery,
  onSearchQueryChange,
}: ChatsPaneProps) => {
  const content = useIntlayer("chat") as any

  const participantsFromDB = useLiveQuery(() => db.participants.toArray())

  return (
    <Sheet
      sx={{
        borderRight: "1px solid",
        borderColor: "divider",
        height: { sm: "calc(100dvh - var(--Header-height))", md: "100dvh" },
        overflowY: "auto",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          pb: 1.5,
        }}
      >
        <Typography
          component="h1"
          endDecorator={
            <Chip
              variant="soft"
              color="primary"
              size="md"
              slotProps={{ root: { component: "span" } }}
            >
              {chats.length}
            </Chip>
          }
          sx={{
            fontSize: { xs: "md", md: "lg" },
            fontWeight: "lg",
            mr: "auto",
          }}
        >
          {content.title}
        </Typography>
        <IconButton variant="plain" aria-label="edit" color="neutral" size="sm">
          <EditNoteRoundedIcon />
        </IconButton>
      </Stack>
      <Box sx={{ px: 2, pb: 1.5 }}>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder={content.searchPlaceholder as string}
          aria-label="Search"
          value={searchQuery}
          onChange={e => {
            onSearchQueryChange(e.target.value)
          }}
        />
      </Box>
      {chats.length === 0 ? (
        <Box sx={{ py: 4, textAlign: "center" }}>
          <Typography level="body-sm" color="neutral">
            {content.noChats}
          </Typography>
        </Box>
      ) : (
        <List
          sx={{
            py: 0,
            "--ListItem-paddingY": "0.75rem",
            "--ListItem-paddingX": "1rem",
          }}
        >
          {chats.map(chat => {
            const senderId = chat.last_message.participant.id
            const sender =
              participantsFromDB?.find(p => p.id === senderId) ?? null

            return (
              <ChatListItem
                key={chat.id}
                id={chat.id}
                name={chat.name}
                photo={chat.photo as unknown as string | null}
                sender={sender}
                lastMessageContent={chat.last_message.content}
                unread={chat.metadata.not_seen > 0}
                selectedChatId={selectedChatId}
                onSelect={setSelectedChatId}
              />
            )
          })}
        </List>
      )}
    </Sheet>
  )
}
