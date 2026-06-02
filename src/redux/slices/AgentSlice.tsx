import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type AgentPageState = {
  searchQuery: string
  selectedNature: string
  selectedType: string
  limit: number
  offset: number
  debouncedSearchTimeout: NodeJS.Timeout | null
}

const initialState: AgentPageState = {
  searchQuery: "",
  selectedNature: "",
  selectedType: "",
  limit: 6,
  offset: 0,
  debouncedSearchTimeout: null,
}

const agentSlice = createSlice({
  name: "agentPage",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
      state.offset = 0 // Reset to first page when search changes
    },
    setSelectedNature(state, action: PayloadAction<string>) {
      state.selectedNature = action.payload
      state.offset = 0 // Reset to first page when filter changes
    },
    setSelectedType(state, action: PayloadAction<string>) {
      state.selectedType = action.payload
      state.offset = 0 // Reset to first page when filter changes
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload
    },
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload
    },
    setDebouncedSearchTimeout(
      state,
      action: PayloadAction<NodeJS.Timeout | null>,
    ) {
      state.debouncedSearchTimeout = action.payload
    },
    resetFilters() {
      return initialState
    },
  },
})

export const {
  setSearchQuery,
  setSelectedNature,
  setSelectedType,
  setLimit,
  setOffset,
  setDebouncedSearchTimeout,
  resetFilters,
} = agentSlice.actions

export const agentReducer = agentSlice.reducer
