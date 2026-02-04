import { type Dictionary, t } from "intlayer"

const heroContent = {
  key: "hero",
  content: {
    title: t({
      en: "Connect Instantly, Chat Securely",
      es: "Conéctate al Instante, Chatea de Forma Segura",
    }),
    subtitle: t({
      en: "Experience seamless messaging with end-to-end encryption. Share moments, stay connected, and communicate with everyone you care about.",
      es: "Experimenta mensajería fluida con cifrado de extremo a extremo. Comparte momentos, mantente conectado y comunícate con todos los que te importan.",
    }),
    startMessaging: t({
      en: "Start Messaging",
      es: "Comenzar a Chatear",
    }),
    learnMore: t({
      en: "Learn More",
      es: "Más Información",
    }),
  },
} satisfies Dictionary

export default heroContent
