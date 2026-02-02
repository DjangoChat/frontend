import type { ReactNode } from "react"
import { LanguageProvider } from "../contexts"

export function ContextContainer({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}
