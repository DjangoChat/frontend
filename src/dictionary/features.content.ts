import { type Dictionary, t } from "intlayer"

const featuresContent = {
  key: "features",
  content: {
    sectionTitle: t({
      en: "Why Choose Us",
      es: "Por Qué Elegirnos",
    }),
    sectionDescription: t({
      en: "Discover the features that make our messaging platform the best choice for staying connected",
      es: "Descubre las características que hacen de nuestra plataforma de mensajería la mejor opción para mantenerte conectado",
    }),
    encryption: {
      title: t({
        en: "End-to-End Encryption",
        es: "Cifrado de Extremo a Extremo",
      }),
      description: t({
        en: "Your messages are secured with end-to-end encryption. Only you and the person you're communicating with can read them.",
        es: "Tus mensajes están protegidos con cifrado de extremo a extremo. Solo tú y la persona con la que te comunicas pueden leerlos.",
      }),
    },
    groupChats: {
      title: t({
        en: "Group Chats",
        es: "Chats Grupales",
      }),
      description: t({
        en: "Stay connected with family and friends. Create groups to chat with multiple people at once and share moments together.",
        es: "Mantente conectado con familiares y amigos. Crea grupos para chatear con varias personas a la vez y compartir momentos juntos.",
      }),
    },
    instantMessaging: {
      title: t({
        en: "Instant Messaging",
        es: "Mensajería Instantánea",
      }),
      description: t({
        en: "Send and receive messages instantly. Share photos, videos, documents, and voice messages with anyone, anywhere.",
        es: "Envía y recibe mensajes al instante. Comparte fotos, videos, documentos y mensajes de voz con cualquier persona, en cualquier lugar.",
      }),
    },
  },
} satisfies Dictionary

export default featuresContent
