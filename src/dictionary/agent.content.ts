import { type Dictionary, t } from "intlayer"

const agentContent = {
  key: "agent",
  content: {
    title: t({
      en: "Chat Agents",
      es: "Agentes de Chat",
    }),
    description: t({
      en: "Browse and chat with our AI agents",
      es: "Explora y chatea con nuestros agentes de IA",
    }),
    searchPlaceholder: t({
      en: "Search agents...",
      es: "Buscar agentes...",
    }),
    filterByNature: t({
      en: "Filter by Nature",
      es: "Filtrar por Naturaleza",
    }),
    filterByType: t({
      en: "Filter by Type",
      es: "Filtrar por Tipo",
    }),
    allNatures: t({
      en: "All Natures",
      es: "Todas las Naturalezas",
    }),
    allTypes: t({
      en: "All Types",
      es: "Todos los Tipos",
    }),
    chatButton: t({
      en: "Chat",
      es: "Chatear",
    }),
    noAccess: t({
      en: "No Access",
      es: "Sin Acceso",
    }),
    noResults: t({
      en: "No agents found",
      es: "No se encontraron agentes",
    }),
    noAgents: t({
      en: "No agents available",
      es: "No hay agentes disponibles",
    }),
    loading: t({
      en: "Loading agents...",
      es: "Cargando agentes...",
    }),
    error: t({
      en: "Error loading agents",
      es: "Error al cargar agentes",
    }),
  },
} satisfies Dictionary

export default agentContent
