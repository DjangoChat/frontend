import { type Dictionary, t } from "intlayer"

const notFoundContent = {
  key: "notfound",
  content: {
    title: t({
      en: "Page Not Found",
      es: "Página No Encontrada",
    }),
    description: t({
      en: "The page you are looking for doesn't exist or has been moved. Please check the URL or return to the homepage.",
      es: "La página que buscas no existe o ha sido movida. Por favor verifica la URL o vuelve a la página principal.",
    }),
    backHome: t({
      en: "Back to Home",
      es: "Volver al Inicio",
    }),
  },
} satisfies Dictionary

export default notFoundContent
