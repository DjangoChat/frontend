import { type Dictionary, t } from "intlayer"

const registerSuccessContent = {
  key: "registersuccess",
  content: {
    title: t({
      en: "Account Created!",
      es: "¡Cuenta Creada!",
    }),
    description: t({
      en: "Your account has been successfully created. You can now sign in to start chatting.",
      es: "Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión para comenzar a chatear.",
    }),
    signIn: t({
      en: "Sign In",
      es: "Iniciar Sesión",
    }),
    goHome: t({
      en: "Go to Home",
      es: "Ir al Inicio",
    }),
  },
} satisfies Dictionary

export default registerSuccessContent
