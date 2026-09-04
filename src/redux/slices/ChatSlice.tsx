import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type ChatPageState = {
  searchQuery: string
  selectedChatId: string | null
  cursor: string | null
  pageSize: number
}

const initialState: ChatPageState = {
  searchQuery: "",
  selectedChatId: null,
  cursor: null,
  pageSize: 50,
}

const chatSlice = createSlice({
  name: "chatPage",
  initialState,
  reducers: {
    setChatSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
      state.cursor = null // Reset cursor pagination when search changes
    },
    setSelectedChatId(state, action: PayloadAction<string | null>) {
      state.selectedChatId = action.payload
    },
    setChatCursor(state, action: PayloadAction<string | null>) {
      state.cursor = action.payload
    },
    setChatPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload
    },
    resetChatFilters() {
      return initialState
    },
  },
})

export const {
  setChatSearchQuery,
  setSelectedChatId,
  setChatCursor,
  setChatPageSize,
  resetChatFilters,
} = chatSlice.actions

export const chatReducer = chatSlice.reducer
