import { type Dictionary, t } from "intlayer"

const registerContent = {
  key: "register",
  content: {
    title: t({
      en: "Create your account",
      es: "Crea tu cuenta",
    }),
    alreadyHaveAccount: t({
      en: "Already have an account?",
      es: "¿Ya tienes una cuenta?",
    }),
    signInLink: t({
      en: "Sign in!",
      es: "¡Inicia sesión!",
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
    phoneLabel: t({
      en: "Phone number",
      es: "Número de teléfono",
    }),
    passwordLabel: t({
      en: "Password",
      es: "Contraseña",
    }),
    confirmPasswordLabel: t({
      en: "Confirm password",
      es: "Confirmar contraseña",
    }),
    signUpButton: t({
      en: "Sign Up",
      es: "Registrarse",
    }),
    copyright: t({
      en: "© ChatApp",
      es: "© ChatApp",
    }),
  },
} satisfies Dictionary

export default registerContent
