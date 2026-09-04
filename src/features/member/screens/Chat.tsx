import Box from "@mui/joy/Box"
import Sheet from "@mui/joy/Sheet"
import Typography from "@mui/joy/Typography"
import { useChatSocket } from "../../../hooks"
import { useAppDispatch, useAppSelector } from "../../../redux"
import { useGetAllChatsQuery } from "../../../redux/services/ChatApi"
import { setChatSearchQuery, setSelectedChatId } from "../../../redux/slices"
import { ChatsPane, MessagesPane } from "./Chat/components"

export const Chat = () => {
  const dispatch = useAppDispatch()

  const { searchQuery, selectedChatId, pageSize } = useAppSelector(
    state => state.chatPage,
  )

  const queryParams = {
    page_size: pageSize,
    ...(searchQuery && { search: searchQuery }),
  }

  const {
    data: chatsResponse,
    isLoading: chatsLoading,
    error: chatsError,
  } = useGetAllChatsQuery(queryParams)

  // Connect to the chat websocket whenever a chat is selected.
  const { status: socketStatus } = useChatSocket(selectedChatId)

  const chats = chatsResponse?.results ?? []
  const selectedChat = chats.find(chat => chat.id === selectedChatId) ?? null

  return (
    <Sheet
      sx={{
        flex: 1,
        width: "100%",
        mx: "auto",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "minmax(min-content, min(30%, 400px)) 1fr",
        },
      }}
    >
      {chatsLoading && (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography level="body-md">Loading...</Typography>
        </Box>
      )}

      {chatsError ? (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography level="body-md" color="danger">
            Error loading chats
          </Typography>
        </Box>
      ) : (
        !chatsLoading && (
          <>
            <Sheet
              sx={{
                position: { xs: "fixed", sm: "sticky" },
                transform: {
                  xs: "translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))",
                  sm: "none",
                },
                transition: "transform 0.4s, width 0.4s",
                zIndex: 100,
                width: "100%",
                top: 52,
              }}
            >
              <ChatsPane
                chats={chats}
                selectedChatId={selectedChatId}
                setSelectedChatId={chatId => {
                  dispatch(setSelectedChatId(chatId))
                }}
                searchQuery={searchQuery}
                onSearchQueryChange={value => {
                  dispatch(setChatSearchQuery(value))
                }}
              />
            </Sheet>
            <MessagesPane chat={selectedChat} socketStatus={socketStatus} />
          </>
        )
      )}
    </Sheet>
  )
}
