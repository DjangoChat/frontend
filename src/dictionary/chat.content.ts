import { type Dictionary, t } from "intlayer"

const chatContent = {
  key: "chat",
  content: {
    title: t({
      en: "Messages",
      es: "Mensajes",
    }),
    searchPlaceholder: t({
      en: "Search chats...",
      es: "Buscar chats...",
    }),
    noChats: t({
      en: "No conversations yet",
      es: "Aún no hay conversaciones",
    }),
    loading: t({
      en: "Loading chats...",
      es: "Cargando chats...",
    }),
    error: t({
      en: "Error loading chats",
      es: "Error al cargar chats",
    }),
    selectChat: t({
      en: "Select a conversation to start chatting",
      es: "Selecciona una conversación para empezar a chatear",
    }),
    noMessages: t({
      en: "Messages coming soon",
      es: "Mensajes próximamente",
    }),
    loadMore: t({
      en: "Load more",
      es: "Cargar más",
    }),
  },
} satisfies Dictionary

export default chatContent
