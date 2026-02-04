import { type Dictionary, t } from "intlayer"

const topbarContent = {
  key: "topbar",
  content: {
    appName: t({
      en: "ChatApp",
      es: "ChatApp",
    }),
    login: t({
      en: "Login",
      es: "Iniciar sesión",
    }),
    signUp: t({
      en: "Sign Up",
      es: "Registrarse",
    }),
    languageSelector: {
      english: t({
        en: "English",
        es: "English",
      }),
      spanish: t({
        en: "Español",
        es: "Español",
      }),
    },
  },
} satisfies Dictionary

export default topbarContent
