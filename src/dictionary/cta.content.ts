import { type Dictionary, t } from "intlayer"

const ctaContent = {
  key: "cta",
  content: {
    title: t({
      en: "Ready to Start Chatting?",
      es: "¿Listo para Empezar a Chatear?",
    }),
    description: t({
      en: "Join millions of users worldwide and experience secure, fast messaging. Create your account now and start connecting!",
      es: "Únete a millones de usuarios en todo el mundo y experimenta mensajería segura y rápida. ¡Crea tu cuenta ahora y comienza a conectarte!",
    }),
    signUpNow: t({
      en: "Sign Up Now",
      es: "Regístrate Ahora",
    }),
  },
} satisfies Dictionary

export default ctaContent
