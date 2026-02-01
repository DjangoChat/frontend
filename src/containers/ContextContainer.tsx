import type { ReactNode } from "react"
import { ThemeProvider } from "../contexts"

export function ContextContainer({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
