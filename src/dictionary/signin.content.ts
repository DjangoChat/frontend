import { type Dictionary, t } from "intlayer"

const signInContent = {
  key: "signin",
  content: {
    title: t({
      en: "Sign in",
      es: "Iniciar sesión",
    }),
    newToApp: t({
      en: "New to ChatApp?",
      es: "¿Nuevo en ChatApp?",
    }),
    signUpLink: t({
      en: "Sign up!",
      es: "¡Regístrate!",
    }),
    continueWithGoogle: t({
      en: "Continue with Google",
      es: "Continuar con Google",
    }),
    or: t({
      en: "or",
      es: "o",
    }),
    emailLabel: t({
      en: "Email",
      es: "Correo electrónico",
    }),
    passwordLabel: t({
      en: "Password",
      es: "Contraseña",
    }),
    rememberMe: t({
      en: "Remember me",
      es: "Recordarme",
    }),
    forgotPassword: t({
      en: "Forgot your password?",
      es: "¿Olvidaste tu contraseña?",
    }),
    signInButton: t({
      en: "Sign in",
      es: "Iniciar sesión",
    }),
    copyright: t({
      en: "© ChatApp",
      es: "© ChatApp",
    }),
  },
} satisfies Dictionary

export default signInContent
